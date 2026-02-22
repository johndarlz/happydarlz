// Enhanced mock analysis for frontend demo
// In production, this would call the Flask API with real ML models

interface AnalysisResult {
  prediction: "FAKE" | "REAL";
  confidence: number;
  importantWords: { word: string; weight: number; suspicious: boolean }[];
  explanation: string;
}

// Suspicious patterns commonly found in fake news (weighted)
const suspiciousPatterns: { pattern: string; weight: number }[] = [
  // Sensationalism
  { pattern: "shocking", weight: 0.9 },
  { pattern: "breaking", weight: 0.5 },
  { pattern: "unbelievable", weight: 0.85 },
  { pattern: "you won't believe", weight: 0.95 },
  { pattern: "mind-blowing", weight: 0.8 },
  { pattern: "jaw-dropping", weight: 0.8 },
  // Conspiracy language
  { pattern: "secret", weight: 0.6 },
  { pattern: "revealed", weight: 0.5 },
  { pattern: "conspiracy", weight: 0.95 },
  { pattern: "they don't want you to know", weight: 0.98 },
  { pattern: "mainstream media", weight: 0.7 },
  { pattern: "cover-up", weight: 0.85 },
  { pattern: "deep state", weight: 0.95 },
  { pattern: "wake up", weight: 0.6 },
  { pattern: "open your eyes", weight: 0.8 },
  { pattern: "sheeple", weight: 0.95 },
  { pattern: "new world order", weight: 0.95 },
  // Misinformation markers
  { pattern: "exposed", weight: 0.6 },
  { pattern: "banned", weight: 0.65 },
  { pattern: "miracle cure", weight: 0.95 },
  { pattern: "doctors hate", weight: 0.95 },
  { pattern: "big pharma", weight: 0.85 },
  { pattern: "chemtrails", weight: 0.98 },
  { pattern: "hoax", weight: 0.7 },
  { pattern: "fake news", weight: 0.5 },
  { pattern: "lies", weight: 0.5 },
  { pattern: "the truth about", weight: 0.7 },
  { pattern: "what they're hiding", weight: 0.9 },
  // Urgency/clickbait
  { pattern: "share before deleted", weight: 0.95 },
  { pattern: "going viral", weight: 0.6 },
  { pattern: "act now", weight: 0.7 },
  { pattern: "limited time", weight: 0.6 },
  { pattern: "urgent", weight: 0.5 },
  // Emotional manipulation
  { pattern: "outrage", weight: 0.6 },
  { pattern: "terrifying", weight: 0.65 },
  { pattern: "destroy", weight: 0.5 },
  { pattern: "catastrophe", weight: 0.5 },
];

// Credible patterns often found in real news (weighted)
const crediblePatterns: { pattern: string; weight: number }[] = [
  // Attribution
  { pattern: "according to", weight: 0.8 },
  { pattern: "sources say", weight: 0.6 },
  { pattern: "officials said", weight: 0.75 },
  { pattern: "spokesperson", weight: 0.7 },
  { pattern: "statement released", weight: 0.7 },
  // Research & evidence
  { pattern: "study shows", weight: 0.85 },
  { pattern: "study published", weight: 0.9 },
  { pattern: "research", weight: 0.6 },
  { pattern: "peer-reviewed", weight: 0.95 },
  { pattern: "data", weight: 0.4 },
  { pattern: "statistics", weight: 0.5 },
  { pattern: "evidence", weight: 0.55 },
  { pattern: "findings", weight: 0.6 },
  // Credible sources
  { pattern: "university", weight: 0.7 },
  { pattern: "scientists", weight: 0.65 },
  { pattern: "researchers", weight: 0.7 },
  { pattern: "experts", weight: 0.6 },
  { pattern: "published in", weight: 0.8 },
  { pattern: "journal", weight: 0.75 },
  { pattern: "report", weight: 0.5 },
  { pattern: "official", weight: 0.5 },
  // Balanced reporting
  { pattern: "however", weight: 0.5 },
  { pattern: "on the other hand", weight: 0.6 },
  { pattern: "critics argue", weight: 0.65 },
  { pattern: "some experts disagree", weight: 0.7 },
  { pattern: "while others", weight: 0.55 },
  // Specific details (hallmarks of real reporting)
  { pattern: "percent", weight: 0.4 },
  { pattern: "million", weight: 0.3 },
  { pattern: "billion", weight: 0.3 },
  { pattern: "announced", weight: 0.4 },
  { pattern: "confirmed", weight: 0.5 },
];

export const analyzeNews = async (text: string): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const lowerText = text.toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  // Score suspicious and credible indicators with weights
  let suspiciousScore = 0;
  let credibleScore = 0;
  const foundWords: { word: string; weight: number; suspicious: boolean }[] = [];

  for (const { pattern, weight } of suspiciousPatterns) {
    if (lowerText.includes(pattern)) {
      suspiciousScore += weight;
      foundWords.push({ word: pattern, weight, suspicious: true });
    }
  }

  for (const { pattern, weight } of crediblePatterns) {
    if (lowerText.includes(pattern)) {
      credibleScore += weight;
      foundWords.push({ word: pattern, weight, suspicious: false });
    }
  }

  // Structural analysis (no randomness)

  // ALL CAPS words (4+ letters) — strong fake signal
  const capsWords = text.match(/\b[A-Z]{4,}\b/g) || [];
  const capsRatio = capsWords.length / Math.max(wordCount, 1);
  if (capsRatio > 0.05) {
    const w = Math.min(capsRatio * 10, 1);
    suspiciousScore += w;
    foundWords.push({ word: "EXCESSIVE CAPS", weight: w, suspicious: true });
  }

  // Excessive punctuation (!!!, ???)
  const excessivePunct = text.match(/[!?]{2,}/g) || [];
  if (excessivePunct.length > 0) {
    const w = Math.min(excessivePunct.length * 0.3, 1);
    suspiciousScore += w;
    foundWords.push({ word: "excessive punctuation", weight: w, suspicious: true });
  }

  // Very short text — lower confidence either way
  const isShort = wordCount < 20;

  // Sentence structure: real news tends to have longer, well-structured sentences
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgSentenceLen = wordCount / Math.max(sentences.length, 1);
  if (avgSentenceLen > 15 && sentences.length > 2) {
    credibleScore += 0.3; // structured writing
  }

  // Presence of quotes (attribution)
  const hasQuotes = /[""].*?[""]/.test(text) || /".*?"/.test(text);
  if (hasQuotes) {
    credibleScore += 0.4;
    foundWords.push({ word: "quoted sources", weight: 0.5, suspicious: false });
  }

  // Presence of numbers/dates (specificity)
  const hasNumbers = /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/.test(text) || /\b\d+%/.test(text);
  if (hasNumbers) {
    credibleScore += 0.3;
    foundWords.push({ word: "specific data/dates", weight: 0.4, suspicious: false });
  }

  // Calculate final score: ratio of suspicious vs credible
  const totalScore = suspiciousScore + credibleScore;
  
  let fakeRatio: number;
  if (totalScore === 0) {
    // No indicators found — lean slightly toward "real" but with low confidence
    fakeRatio = 0.45;
  } else {
    fakeRatio = suspiciousScore / totalScore;
  }

  const isFake = fakeRatio > 0.5;

  // Confidence: how far from 50/50 the score is, scaled to 60-98 range
  const rawConfidence = Math.abs(fakeRatio - 0.5) * 2; // 0 to 1
  let confidence = Math.round(60 + rawConfidence * 38); // 60 to 98

  if (isShort) {
    confidence = Math.min(confidence, 75); // cap confidence for short text
  }

  // Sort found words by weight descending
  foundWords.sort((a, b) => b.weight - a.weight);

  // Ensure we have at least some words to display
  if (foundWords.length === 0) {
    foundWords.push(
      { word: "neutral content", weight: 0.5, suspicious: false },
      { word: "standard language", weight: 0.45, suspicious: false }
    );
  }

  const explanation = generateExplanation(isFake, foundWords, confidence);

  return {
    prediction: isFake ? "FAKE" : "REAL",
    confidence,
    importantWords: foundWords.slice(0, 8),
    explanation
  };
};

const generateExplanation = (
  isFake: boolean,
  words: { word: string; weight: number; suspicious: boolean }[],
  confidence: number
): string => {
  const suspiciousWords = words.filter(w => w.suspicious).map(w => w.word);
  const credibleWords = words.filter(w => !w.suspicious).map(w => w.word);

  if (isFake) {
    let explanation = `The model identified this content as potentially misleading with ${confidence}% confidence. `;

    if (suspiciousWords.length > 0) {
      explanation += `Key indicators include sensationalist or manipulative language such as "${suspiciousWords.slice(0, 3).join('", "')}". `;
    }

    if (credibleWords.length > 0) {
      explanation += `Some credible elements were detected ("${credibleWords.slice(0, 2).join('", "')}"), but suspicious patterns outweighed them. `;
    }

    explanation += "The writing style and word choices match patterns commonly found in misinformation. ";
    explanation += "We recommend verifying this information through trusted news sources before sharing.";

    return explanation;
  } else {
    let explanation = `The model classified this content as likely authentic with ${confidence}% confidence. `;

    if (credibleWords.length > 0) {
      explanation += `The text contains indicators of credible reporting such as "${credibleWords.slice(0, 3).join('", "')}". `;
    }

    if (suspiciousWords.length > 0) {
      explanation += `Minor sensationalist elements were noted ("${suspiciousWords.slice(0, 2).join('", "')}"), but credible patterns dominated. `;
    }

    explanation += "The language and structure align with patterns typically seen in legitimate journalism. ";
    explanation += "However, always cross-reference important information with multiple reliable sources.";

    return explanation;
  }
};
