import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsInput from "@/components/NewsInput";
import ResultCard from "@/components/ResultCard";
import { analyzeNews } from "@/lib/mockAnalysis";

interface AnalysisResult {
  prediction: "FAKE" | "REAL";
  confidence: number;
  importantWords: { word: string; weight: number; suspicious: boolean }[];
  explanation: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const analysisResult = await analyzeNews(text);
      setResult(analysisResult);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <HeroSection />

        <section className="py-16 px-4">
          <div className="container mx-auto">
            <NewsInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>
        </section>

        {result && (
          <section className="py-8 px-4 pb-20">
            <div className="container mx-auto">
              <ResultCard result={result} />
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            VerityAI — AI-Powered Fake News Detection • Final Year Project
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            This tool provides predictions, not final truth. Always verify from multiple sources.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
