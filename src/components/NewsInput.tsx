import { useState } from "react";
import { Search, Loader2, Sparkles } from "lucide-react";
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
    "BREAKING: Scientists discover new species in Amazon rainforest after decade-long expedition.",
    "SHOCKING: Government secretly controls weather using chemtrails, leaked documents reveal!",
    "Local community raises $50,000 for children's hospital through charity marathon event.",
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
              placeholder="Paste news article text here to analyze..."
              className="min-h-[200px] resize-none bg-card border-border/50 rounded-xl p-6 text-base leading-relaxed placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
            />
            <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
              {text.length} characters
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
                Analyzing...
              </>
            ) : (
              <>
                <Search className="h-5 w-5" />
                Analyze News
              </>
            )}
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Powered by Machine Learning</span>
          </div>
        </div>
      </form>

      <div className="mt-8">
        <p className="text-sm text-muted-foreground mb-3">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {exampleNews.map((example, index) => (
            <button
              key={index}
              onClick={() => setText(example)}
              className="text-xs px-3 py-2 rounded-lg bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors text-left max-w-xs truncate"
            >
              {example.substring(0, 50)}...
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsInput;
