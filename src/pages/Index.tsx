import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NewsInput from "@/components/NewsInput";
import ResultCard from "@/components/ResultCard";
import StatsSection from "@/components/StatsSection";
import AnalysisPipeline from "@/components/AnalysisPipeline";
import { analyzeNews } from "@/lib/analysisApi";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setResult(null);
    try {
      const analysisResult = await analyzeNews(text);
      setResult(analysisResult);
    } catch (error: any) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis Failed",
        description: error?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Grid overlay */}
      <div className="fixed inset-0 grid-overlay opacity-20 pointer-events-none" />
      
      <Header />

      <main className="pt-16 relative z-10">
        <HeroSection />

        <section className="py-16 px-4">
          <div className="container mx-auto">
            <NewsInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>
        </section>

        <AnalysisPipeline isActive={isLoading} />

        {result && (
          <section className="py-8 px-4 pb-20">
            <div className="container mx-auto">
              <ResultCard result={result} />
            </div>
          </section>
        )}

        <StatsSection />
      </main>

      <footer className="border-t border-border/30 py-8 mt-auto relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-display tracking-wider">
            VerityAI — Credibility Analysis Engine
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2 font-body">
            This tool provides predictions with confidence &amp; reasoning, not final truth. Always verify from multiple sources.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
