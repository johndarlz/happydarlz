import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import ParticleNetwork from "./ParticleNetwork";
import TypewriterText from "./TypewriterText";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <ParticleNetwork />

      {/* Glowing orb behind title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[300px] h-[300px] rounded-full bg-primary/8 blur-[80px] pointer-events-none" style={{ animation: "float 8s ease-in-out infinite" }} />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-8"
        >
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-xs font-display uppercase tracking-widest text-primary">
            Powered by Deep Learning
          </span>
          <span className="text-xs text-muted-foreground">|</span>
          <span className="text-xs font-bold text-primary">97.2% Accuracy</span>
          {/* Shimmer sweep */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" style={{ backgroundSize: "200% 100%" }} />
          </div>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <TypewriterText
            text="Detect Fake News With 97% Accuracy"
            speed={40}
            delay={600}
            highlightWords={["Fake News"]}
          />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 font-body"
        >
          Our AI model classifies news as <strong className="text-foreground">Real</strong> or{" "}
          <strong className="text-foreground">Fake</strong> using deep analysis of claims, sources,
          language patterns, and factual consistency.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.3 }}
          className="text-sm text-muted-foreground/60 max-w-xl mx-auto mb-10 font-body"
        >
          ⚠️ This tool provides AI predictions with confidence &amp; reasoning, not absolute truth.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground/50 font-display uppercase tracking-widest">Scroll to Analyze</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
