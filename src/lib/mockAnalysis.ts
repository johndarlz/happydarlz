// Claim-level credibility analysis engine
// In production, this would use a fine-tuned BERT/RoBERTa model

interface Claim {
  text: string;
  type: "verifiable" | "vague" | "opinion" | "absolute";
  credible: boolean;
  reason: string;
}

interface AnalysisResult {
  prediction: "Likely Reliable" | "Questionable" | "Likely Fake";
  confidence: number;
  importantWords: { word: string; weight: number; suspicious: boolean }[];
  explanation: string;
  claims: Claim[];
  needsVerification: string[];
}

// ── Signal detectors ──────────────────────────────────────────────

// Emotional / manipulative language
const emotionalPatterns: { pattern: string; weight: number }[] = [
  { pattern: "shocking", weight: 0.8 },
  { pattern: "unbelievable", weight: 0.85 },
  { pattern: "you won't believe", weight: 0.95 },
  { pattern: "mind-blowing", weight: 0.8 },
  { pattern: "terrifying", weight: 0.65 },
  { pattern: "outrage", weight: 0.6 },
  { pattern: "destroy", weight: 0.5 },
  { pattern: "catastrophe", weight: 0.5 },
  { pattern: "jaw-dropping", weight: 0.75 },
];

// Clickbait / urgency
const clickbaitPatterns: { pattern: string; weight: number }[] = [
  { pattern: "share before deleted", weight: 0.95 },
  { pattern: "going viral", weight: 0.6 },
  { pattern: "act now", weight: 0.7 },
  { pattern: "limited time", weight: 0.6 },
  { pattern: "urgent", weight: 0.5 },
  { pattern: "breaking", weight: 0.4 },
  { pattern: "exclusive", weight: 0.4 },
];

// Absolute / conspiracy claims
const absolutePatterns: { pattern: string; weight: number }[] = [
  { pattern: "100% proof", weight: 0.95 },
  { pattern: "they don't want you to know", weight: 0.98 },
  { pattern: "conspiracy", weight: 0.95 },
  { pattern: "cover-up", weight: 0.85 },
  { pattern: "deep state", weight: 0.95 },
  { pattern: "new world order", weight: 0.95 },
  { pattern: "mainstream media", weight: 0.7 },
  { pattern: "wake up", weight: 0.6 },
  { pattern: "open your eyes", weight: 0.8 },
  { pattern: "sheeple", weight: 0.95 },
  { pattern: "miracle cure", weight: 0.95 },
  { pattern: "doctors hate", weight: 0.95 },
  { pattern: "big pharma", weight: 0.85 },
  { pattern: "chemtrails", weight: 0.98 },
  { pattern: "what they're hiding", weight: 0.9 },
  { pattern: "the truth about", weight: 0.7 },
  { pattern: "exposed", weight: 0.6 },
  { pattern: "banned", weight: 0.65 },
  { pattern: "cures", weight: 0.7 },
  { pattern: "secret", weight: 0.5 },
];

// Source credibility signals
const credibilityPatterns: { pattern: string; weight: number }[] = [
  { pattern: "according to", weight: 0.8 },
  { pattern: "sources say", weight: 0.5 },
  { pattern: "officials said", weight: 0.75 },
  { pattern: "spokesperson", weight: 0.7 },
  { pattern: "statement released", weight: 0.7 },
  { pattern: "study shows", weight: 0.85 },
  { pattern: "study published", weight: 0.9 },
  { pattern: "research", weight: 0.5 },
  { pattern: "peer-reviewed", weight: 0.95 },
  { pattern: "published in", weight: 0.8 },
  { pattern: "journal", weight: 0.75 },
  { pattern: "university", weight: 0.7 },
  { pattern: "scientists", weight: 0.65 },
  { pattern: "researchers", weight: 0.7 },
  { pattern: "experts", weight: 0.55 },
  { pattern: "evidence", weight: 0.55 },
  { pattern: "findings", weight: 0.6 },
  { pattern: "data", weight: 0.4 },
  { pattern: "statistics", weight: 0.5 },
  { pattern: "report", weight: 0.45 },
  { pattern: "confirmed", weight: 0.5 },
  { pattern: "announced", weight: 0.4 },
];

// Balanced reporting signals
const balancePatterns: { pattern: string; weight: number }[] = [
  { pattern: "however", weight: 0.5 },
  { pattern: "on the other hand", weight: 0.6 },
  { pattern: "critics argue", weight: 0.65 },
  { pattern: "some experts disagree", weight: 0.7 },
  { pattern: "while others", weight: 0.55 },
  { pattern: "it remains unclear", weight: 0.5 },
  { pattern: "could not be independently verified", weight: 0.6 },
];

// ── Claim extraction ──────────────────────────────────────────────

function extractClaims(text: string): Claim[] {
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 10);
  const claims: Claim[] = [];

  for (const sentence of sentences.slice(0, 6)) {
    const lower = sentence.toLowerCase();

    // Check for absolute claims
    const hasAbsolute = absolutePatterns.some(p => lower.includes(p.pattern));
    if (hasAbsolute) {
      claims.push({
        text: sentence,
        type: "absolute",
        credible: false,
        reason: "Contains absolute or conspiracy language without evidence"
      });
      continue;
    }

    // Check for vague assertions
    const hasCredibleSource = credibilityPatterns.some(p => lower.includes(p.pattern));
    const hasSpecificData = /\b\d+%|\b\d{4}\b|\b\d+\s*(million|billion|thousand)/.test(sentence);
    const hasNamedEntity = /[A-Z][a-z]+\s+[A-Z][a-z]+/.test(sentence);

    if (!hasCredibleSource && !hasSpecificData && !hasNamedEntity) {
      // Check if it's an opinion
      const opinionWords = ["i think", "i believe", "in my opinion", "clearly", "obviously", "everyone knows"];
      const isOpinion = opinionWords.some(w => lower.includes(w));
      
      if (isOpinion) {
        claims.push({
          text: sentence,
          type: "opinion",
          credible: false,
          reason: "Opinion stated as fact, not a verifiable claim"
        });
      } else {
        claims.push({
          text: sentence,
          type: "vague",
          credible: false,
          reason: "Vague assertion without named sources, data, or evidence"
        });
      }
      continue;
    }

    claims.push({
      text: sentence,
      type: "verifiable",
      credible: true,
      reason: hasCredibleSource
        ? "Attributes information to a named source"
        : hasSpecificData
        ? "Contains specific, verifiable data points"
        : "References identifiable entities"
    });
  }

  return claims;
}

// ── Main analysis ─────────────────────────────────────────────────

export const analyzeNews = async (text: string): Promise<AnalysisResult> => {
  await new Promise(resolve => setTimeout(resolve, 1800));

  const lowerText = text.toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const foundWords: { word: string; weight: number; suspicious: boolean }[] = [];

  // Score each signal category
  let emotionalScore = 0;
  for (const { pattern, weight } of emotionalPatterns) {
    if (lowerText.includes(pattern)) {
      emotionalScore += weight;
      foundWords.push({ word: pattern, weight, suspicious: true });
    }
  }

  let clickbaitScore = 0;
  for (const { pattern, weight } of clickbaitPatterns) {
    if (lowerText.includes(pattern)) {
      clickbaitScore += weight;
      foundWords.push({ word: pattern, weight, suspicious: true });
    }
  }

  let absoluteScore = 0;
  for (const { pattern, weight } of absolutePatterns) {
    if (lowerText.includes(pattern)) {
      absoluteScore += weight;
      foundWords.push({ word: pattern, weight, suspicious: true });
    }
  }

  let credibilityScore = 0;
  for (const { pattern, weight } of credibilityPatterns) {
    if (lowerText.includes(pattern)) {
      credibilityScore += weight;
      foundWords.push({ word: pattern, weight, suspicious: false });
    }
  }

  let balanceScore = 0;
  for (const { pattern, weight } of balancePatterns) {
    if (lowerText.includes(pattern)) {
      balanceScore += weight;
      foundWords.push({ word: pattern, weight, suspicious: false });
    }
  }

  // Structural signals
  const capsWords = text.match(/\b[A-Z]{4,}\b/g) || [];
  const capsRatio = capsWords.length / Math.max(wordCount, 1);
  if (capsRatio > 0.05) {
    const w = Math.min(capsRatio * 8, 1);
    emotionalScore += w;
    foundWords.push({ word: "EXCESSIVE CAPS", weight: w, suspicious: true });
  }

  const excessivePunct = text.match(/[!?]{2,}/g) || [];
  if (excessivePunct.length > 0) {
    const w = Math.min(excessivePunct.length * 0.3, 1);
    clickbaitScore += w;
    foundWords.push({ word: "excessive punctuation", weight: w, suspicious: true });
  }

  // Quotes = attribution
  const hasQuotes = /[""\u201C].*?[""\u201D]/.test(text) || /".*?"/.test(text);
  if (hasQuotes) {
    credibilityScore += 0.5;
    foundWords.push({ word: "quoted sources", weight: 0.5, suspicious: false });
  }

  // Specific numbers / dates
  const hasSpecificData = /\b\d+%/.test(text) || /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/.test(text);
  if (hasSpecificData) {
    credibilityScore += 0.3;
    foundWords.push({ word: "specific data/dates", weight: 0.4, suspicious: false });
  }

  // Sentence quality
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLen = wordCount / Math.max(sentences.length, 1);
  if (avgSentenceLen > 15 && sentences.length > 2) {
    credibilityScore += 0.3;
  }

  // Extract claims
  const claims = extractClaims(text);
  const credibleClaims = claims.filter(c => c.credible).length;
  const totalClaims = claims.length || 1;
  const claimCredibilityRatio = credibleClaims / totalClaims;

  // Combine all signals into final score (0-100)
  const suspiciousTotal = emotionalScore + clickbaitScore + absoluteScore;
  const credibleTotal = credibilityScore + balanceScore;
  const totalSignals = suspiciousTotal + credibleTotal;

  let credibilityPercent: number;
  if (totalSignals === 0) {
    // No strong signals — rely on claim analysis
    credibilityPercent = 40 + claimCredibilityRatio * 30; // 40-70
  } else {
    const baseScore = credibleTotal / totalSignals; // 0-1, higher = more credible
    credibilityPercent = baseScore * 70 + claimCredibilityRatio * 30; // weighted
  }

  // Short text = lower confidence
  const isShort = wordCount < 20;
  if (isShort) {
    credibilityPercent = Math.min(credibilityPercent, 55);
  }

  credibilityPercent = Math.round(Math.max(2, Math.min(98, credibilityPercent)));

  // 3-tier classification
  let prediction: "Likely Reliable" | "Questionable" | "Likely Fake";
  if (credibilityPercent >= 65) {
    prediction = "Likely Reliable";
  } else if (credibilityPercent >= 35) {
    prediction = "Questionable";
  } else {
    prediction = "Likely Fake";
  }

  // What needs verification
  const needsVerification: string[] = [];
  if (!hasQuotes) needsVerification.push("No direct quotes or attributed sources found");
  if (!hasSpecificData) needsVerification.push("No specific data points or dates to verify");
  if (claims.filter(c => c.type === "vague").length > 0) needsVerification.push("Contains vague assertions — look for primary sources");
  if (absoluteScore > 0) needsVerification.push("Contains extraordinary claims — require extraordinary evidence");
  if (emotionalScore > 1) needsVerification.push("High emotional language — check if facts hold without the emotion");
  if (needsVerification.length === 0) needsVerification.push("Cross-reference key facts with multiple reliable sources");

  foundWords.sort((a, b) => b.weight - a.weight);

  if (foundWords.length === 0) {
    foundWords.push(
      { word: "neutral content", weight: 0.5, suspicious: false },
      { word: "standard language", weight: 0.45, suspicious: false }
    );
  }

  const explanation = generateExplanation(prediction, credibilityPercent, foundWords, claims, needsVerification);

  return {
    prediction,
    confidence: credibilityPercent,
    importantWords: foundWords.slice(0, 10),
    explanation,
    claims,
    needsVerification
  };
};

function generateExplanation(
  prediction: string,
  confidence: number,
  words: { word: string; weight: number; suspicious: boolean }[],
  claims: Claim[],
  needsVerification: string[]
): string {
  const suspicious = words.filter(w => w.suspicious).map(w => w.word);
  const credible = words.filter(w => !w.suspicious).map(w => w.word);
  const vagueClaims = claims.filter(c => c.type === "vague" || c.type === "absolute").length;
  const verifiableClaims = claims.filter(c => c.type === "verifiable").length;

  let explanation = `Credibility Score: ${confidence}/100 — Classification: ${prediction}. `;

  if (prediction === "Likely Fake") {
    explanation += "The text exhibits strong indicators of unreliable content. ";
    if (suspicious.length > 0) {
      explanation += `Detected manipulative language: "${suspicious.slice(0, 3).join('", "')}". `;
    }
    if (vagueClaims > 0) {
      explanation += `Found ${vagueClaims} claim(s) that are vague or use absolute language without evidence. `;
    }
    explanation += "This content contradicts patterns seen in credible journalism. Verify all claims independently before sharing.";
  } else if (prediction === "Questionable") {
    explanation += "The text shows mixed signals — some credible elements alongside concerning patterns. ";
    if (suspicious.length > 0) {
      explanation += `Flagged language: "${suspicious.slice(0, 2).join('", "')}". `;
    }
    if (credible.length > 0) {
      explanation += `Positive indicators: "${credible.slice(0, 2).join('", "')}". `;
    }
    explanation += "Additional verification is strongly recommended before drawing conclusions.";
  } else {
    explanation += "The text follows patterns consistent with credible reporting. ";
    if (credible.length > 0) {
      explanation += `Detected credibility signals: "${credible.slice(0, 3).join('", "')}". `;
    }
    if (verifiableClaims > 0) {
      explanation += `Found ${verifiableClaims} verifiable claim(s) with attributable sources or data. `;
    }
    explanation += "However, no model can guarantee truth — always cross-reference with multiple reliable sources.";
  }

  return explanation;
}
