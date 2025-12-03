// Mock analysis function for frontend demo
// In production, this would call the Flask API

interface AnalysisResult {
  prediction: "FAKE" | "REAL";
  confidence: number;
  importantWords: { word: string; weight: number; suspicious: boolean }[];
  explanation: string;
}

// Suspicious patterns commonly found in fake news
const suspiciousPatterns = [
  "shocking", "breaking", "secret", "revealed", "conspiracy",
  "they don't want you to know", "mainstream media", "cover-up",
  "unbelievable", "miracle", "cure", "banned", "exposed",
  "chemtrails", "deep state", "fake", "hoax", "lies"
];

// Credible patterns often found in real news
const crediblePatterns = [
  "according to", "study shows", "research", "experts",
  "university", "scientists", "official", "report",
  "published", "peer-reviewed", "data", "statistics"
];

export const analyzeNews = async (text: string): Promise<AnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);

  // Count suspicious and credible words
  let suspiciousCount = 0;
  let credibleCount = 0;
  const foundWords: { word: string; weight: number; suspicious: boolean }[] = [];

  suspiciousPatterns.forEach(pattern => {
    if (lowerText.includes(pattern)) {
      suspiciousCount++;
      foundWords.push({
        word: pattern,
        weight: 0.7 + Math.random() * 0.3,
        suspicious: true
      });
    }
  });

  crediblePatterns.forEach(pattern => {
    if (lowerText.includes(pattern)) {
      credibleCount++;
      foundWords.push({
        word: pattern,
        weight: 0.6 + Math.random() * 0.4,
        suspicious: false
      });
    }
  });

  // Check for ALL CAPS usage (common in fake news)
  const capsWords = text.match(/\b[A-Z]{4,}\b/g) || [];
  if (capsWords.length > 2) {
    suspiciousCount += capsWords.length;
    foundWords.push({
      word: "EXCESSIVE CAPS",
      weight: 0.8,
      suspicious: true
    });
  }

  // Check for excessive punctuation (!!!???)
  const excessivePunctuation = text.match(/[!?]{2,}/g) || [];
  if (excessivePunctuation.length > 0) {
    suspiciousCount += excessivePunctuation.length;
    foundWords.push({
      word: "excessive punctuation",
      weight: 0.65,
      suspicious: true
    });
  }

  // Calculate prediction score
  const totalIndicators = suspiciousCount + credibleCount || 1;
  const fakeScore = suspiciousCount / totalIndicators;

  // Add some randomness for realism
  const randomFactor = (Math.random() - 0.5) * 0.2;
  const adjustedScore = Math.max(0, Math.min(1, fakeScore + randomFactor));

  const isFake = adjustedScore > 0.4;
  const confidence = Math.round((isFake ? adjustedScore : 1 - adjustedScore) * 100);

  // Generate explanation
  const explanation = generateExplanation(isFake, foundWords, confidence);

  // Ensure we have at least some words to show
  if (foundWords.length === 0) {
    foundWords.push(
      { word: "neutral content", weight: 0.5, suspicious: false },
      { word: "standard language", weight: 0.45, suspicious: false }
    );
  }

  return {
    prediction: isFake ? "FAKE" : "REAL",
    confidence: Math.max(60, confidence),
    importantWords: foundWords.slice(0, 8),
    explanation
  };
};

const generateExplanation = (
  isFake: boolean,
  words: { word: string; suspicious: boolean }[],
  confidence: number
): string => {
  const suspiciousWords = words.filter(w => w.suspicious).map(w => w.word);
  const credibleWords = words.filter(w => !w.suspicious).map(w => w.word);

  if (isFake) {
    let explanation = `The model identified this content as potentially misleading with ${confidence}% confidence. `;
    
    if (suspiciousWords.length > 0) {
      explanation += `Key indicators include sensationalist language such as "${suspiciousWords.slice(0, 3).join('", "')}". `;
    }
    
    explanation += "The writing style and word choices match patterns commonly found in misinformation. ";
    explanation += "We recommend verifying this information through trusted news sources before sharing.";
    
    return explanation;
  } else {
    let explanation = `The model classified this content as likely authentic with ${confidence}% confidence. `;
    
    if (credibleWords.length > 0) {
      explanation += `The text contains indicators of credible reporting such as "${credibleWords.slice(0, 3).join('", "')}". `;
    }
    
    explanation += "The language and structure align with patterns typically seen in legitimate journalism. ";
    explanation += "However, always cross-reference important information with multiple reliable sources.";
    
    return explanation;
  }
};
