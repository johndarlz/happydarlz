import { CheckCircle, XCircle, AlertTriangle, TrendingUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisResult {
  prediction: "FAKE" | "REAL";
  confidence: number;
  importantWords: { word: string; weight: number; suspicious: boolean }[];
  explanation: string;
}

interface ResultCardProps {
  result: AnalysisResult;
}

const ResultCard = ({ result }: ResultCardProps) => {
  const isFake = result.prediction === "FAKE";

  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up">
      {/* Main Result */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl p-8 shadow-elevated",
          isFake ? "bg-destructive/10 border border-destructive/30" : "bg-success/10 border border-success/30"
        )}
      >
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          {isFake ? (
            <XCircle className="w-full h-full text-destructive" />
          ) : (
            <CheckCircle className="w-full h-full text-success" />
          )}
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div
            className={cn(
              "flex items-center justify-center w-20 h-20 rounded-2xl",
              isFake ? "bg-destructive/20" : "bg-success/20"
            )}
          >
            {isFake ? (
              <XCircle className="w-10 h-10 text-destructive" />
            ) : (
              <CheckCircle className="w-10 h-10 text-success" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="font-display text-3xl font-bold">
                {isFake ? "Likely Fake News" : "Likely Authentic"}
              </h2>
              {isFake && <AlertTriangle className="w-6 h-6 text-destructive animate-pulse" />}
            </div>
            <p className="text-muted-foreground">
              {isFake
                ? "Our model detected patterns commonly associated with misinformation."
                : "This article appears to follow patterns of credible reporting."}
            </p>
          </div>

          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Confidence</div>
            <div
              className={cn(
                "text-4xl font-bold font-display",
                isFake ? "text-destructive" : "text-success"
              )}
            >
              {result.confidence}%
            </div>
          </div>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="mt-6 bg-card rounded-xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Confidence Level
          </span>
          <span className="text-sm text-muted-foreground">{result.confidence}%</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-out",
              isFake ? "bg-destructive" : "bg-success"
            )}
            style={{ width: `${result.confidence}%` }}
          />
        </div>
      </div>

      {/* Key Words Analysis */}
      <div className="mt-6 bg-card rounded-xl p-6 shadow-card">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          Key Indicators
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
      <div className="mt-6 bg-card rounded-xl p-6 shadow-card">
        <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          Analysis Explanation
        </h3>
        <p className="text-muted-foreground leading-relaxed">{result.explanation}</p>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 bg-secondary/30 rounded-xl p-4 border border-border/50">
        <p className="text-xs text-muted-foreground text-center">
          <AlertTriangle className="inline w-3 h-3 mr-1" />
          This tool provides predictions based on machine learning patterns, not definitive truth.
          Always verify information from multiple credible sources.
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
