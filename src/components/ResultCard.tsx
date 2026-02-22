import { CheckCircle, XCircle, AlertTriangle, TrendingUp, Info, ListChecks, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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

interface ResultCardProps {
  result: AnalysisResult;
}

const predictionConfig = {
  "Likely Reliable": {
    icon: CheckCircle,
    color: "text-success",
    bg: "bg-success/10 border-success/30",
    iconBg: "bg-success/20",
    barColor: "bg-success",
    label: "Likely Reliable",
  },
  "Questionable": {
    icon: AlertTriangle,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10 border-yellow-500/30",
    iconBg: "bg-yellow-500/20",
    barColor: "bg-yellow-500",
    label: "Questionable",
  },
  "Likely Fake": {
    icon: XCircle,
    color: "text-destructive",
    bg: "bg-destructive/10 border-destructive/30",
    iconBg: "bg-destructive/20",
    barColor: "bg-destructive",
    label: "Likely Fake",
  },
};

const claimTypeColors = {
  verifiable: "bg-success/20 text-success border-success/30",
  vague: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
  opinion: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  absolute: "bg-destructive/20 text-destructive border-destructive/30",
};

const ResultCard = ({ result }: ResultCardProps) => {
  const config = predictionConfig[result.prediction];
  const Icon = config.icon;

  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up space-y-6">
      {/* Main Result */}
      <div className={cn("relative overflow-hidden rounded-2xl p-8 shadow-elevated border", config.bg)}>
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <Icon className={cn("w-full h-full", config.color)} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className={cn("flex items-center justify-center w-20 h-20 rounded-2xl", config.iconBg)}>
            <Icon className={cn("w-10 h-10", config.color)} />
          </div>

          <div className="flex-1">
            <h2 className="font-display text-3xl font-bold mb-1">{config.label}</h2>
            <p className="text-muted-foreground text-sm">
              This is a probability estimate, not a statement of truth.
            </p>
          </div>

          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Credibility Score</div>
            <div className={cn("text-4xl font-bold font-display", config.color)}>
              {result.confidence}<span className="text-lg">/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Credibility Bar */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Credibility Spectrum
          </span>
          <span className="text-sm text-muted-foreground">{result.confidence}/100</span>
        </div>
        <div className="relative h-4 bg-secondary rounded-full overflow-hidden">
          {/* Gradient background showing spectrum */}
          <div className="absolute inset-0 bg-gradient-to-r from-destructive via-yellow-500 to-success opacity-20 rounded-full" />
          <div
            className={cn("h-full rounded-full transition-all duration-1000 ease-out relative z-10", config.barColor)}
            style={{ width: `${result.confidence}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
          <span>Likely Fake</span>
          <span>Questionable</span>
          <span>Likely Reliable</span>
        </div>
      </div>

      {/* Claim Analysis */}
      {result.claims.length > 0 && (
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-primary" />
            Claim-Level Analysis
          </h3>
          <div className="space-y-3">
            {result.claims.map((claim, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 border border-border/30">
                <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase border mt-0.5 whitespace-nowrap", claimTypeColors[claim.type])}>
                  {claim.type}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-relaxed">"{claim.text}"</p>
                  <p className="text-xs text-muted-foreground mt-1">{claim.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Indicators */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          Signal Indicators
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.importantWords.map((item, index) => (
            <span
              key={index}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105",
                item.suspicious
                  ? "bg-destructive/20 text-destructive border border-destructive/30"
                  : "bg-success/20 text-success border border-success/30"
              )}
            >
              {item.word}
              <span className="ml-1.5 text-xs opacity-70">
                {(item.weight * 100).toFixed(0)}%
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          Analysis Reasoning
        </h3>
        <p className="text-muted-foreground leading-relaxed">{result.explanation}</p>
      </div>

      {/* What Needs Verification */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          What Needs Verification
        </h3>
        <ul className="space-y-2">
          {result.needsVerification.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-primary mt-0.5">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="bg-secondary/30 rounded-xl p-4 border border-border/50">
        <p className="text-xs text-muted-foreground text-center">
          <AlertTriangle className="inline w-3 h-3 mr-1" />
          No model should say "true" or "false" alone. It outputs confidence, reasons, and limits.
          Always verify from multiple credible sources.
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
