import { useState } from "react";
import { Search, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface NewsInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const NewsInput = ({ onAnalyze, isLoading }: NewsInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze(text.trim());
    }
  };

  const exampleNews = [
    {
      label: "🔴 Fake example",
      text: "SHOCKING: Scientists confirm drinking lemon water cures cancer. Doctors hate this miracle cure! Big Pharma has been covering this up for years. Share before they delete this!!!",
    },
    {
      label: "🟢 Real example",
      text: "According to a study published in the Journal of Medicine, researchers at Harvard University found that regular exercise reduces the risk of heart disease by 30%. The peer-reviewed findings, based on data from 50,000 participants over 10 years, were confirmed by independent experts.",
    },
    {
      label: "🟡 Mixed example",
      text: "Breaking: A new report suggests that social media companies are secretly collecting user data. While officials said investigations are underway, critics argue the evidence remains unclear. Some experts disagree on the scope of the issue.",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste a news article or claim here to analyze its credibility..."
              className="min-h-[200px] resize-none bg-card border-border/50 rounded-xl p-6 text-base leading-relaxed placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
            />
            <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
              {text.split(/\s+/).filter(Boolean).length} words
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <Button
            type="submit"
            variant="analyze"
            disabled={!text.trim() || isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Analyzing Claims...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Analyze Credibility
              </>
            )}
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Outputs confidence + reasons, not truth</span>
          </div>
        </div>
      </form>

      <div className="mt-8">
        <p className="text-sm text-muted-foreground mb-3">Try an example:</p>
        <div className="flex flex-col sm:flex-row gap-2">
          {exampleNews.map((example, index) => (
            <button
              key={index}
              onClick={() => setText(example.text)}
              className="text-xs px-3 py-2 rounded-lg bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors text-left"
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsInput;
