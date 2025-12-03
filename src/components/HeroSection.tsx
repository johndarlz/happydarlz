import { Shield, Zap, Brain } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />

      <div className="relative container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Detection</span>
        </div>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Detect <span className="text-gradient">Fake News</span>
          <br />
          Before It Spreads
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Our machine learning model analyzes news articles to identify potential misinformation
          with high accuracy, helping you verify what you read.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/50">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm">3 ML Models</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/50">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-sm">94% Accuracy</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border/50">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm">Real-time Analysis</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
