import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsInput from "@/components/NewsInput";
import ResultCard from "@/components/ResultCard";
import { analyzeNews } from "@/lib/mockAnalysis";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

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

      <footer className="border-t border-border/50 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            VerityAI — Credibility Analysis Engine
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            This tool provides predictions with confidence &amp; reasoning, not final truth. Always verify from multiple sources.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
