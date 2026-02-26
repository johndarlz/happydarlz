import { ShieldCheck, Search, Brain, Gauge } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />

      <div className="relative container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Fake News Detection</span>
        </div>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Detect <span className="text-gradient">Fake News</span>
          <br />
          With 97% Accuracy
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Our AI model classifies news as <strong>Real</strong> or <strong>Fake</strong> using 
          deep analysis of claims, sources, language patterns, and factual consistency.
        </p>

        <p className="text-sm text-muted-foreground/70 max-w-xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.25s" }}>
          ⚠️ This tool provides AI predictions with confidence & reasoning, not absolute truth.
        </p>

        {/* Core Signals */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/50">
            <Search className="w-4 h-4 text-primary" />
            <span className="text-sm">Claim Extraction</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/50">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm">AI Deep Analysis</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/50">
            <Gauge className="w-4 h-4 text-success" />
            <span className="text-sm">97.2% Accuracy</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
