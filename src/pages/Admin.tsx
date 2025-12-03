import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RefreshCw, Database, Brain, BarChart3, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const [isRetraining, setIsRetraining] = useState(false);

  // Mock model statistics
  const modelStats = {
    logisticRegression: { accuracy: 0.91, precision: 0.89, recall: 0.93, f1: 0.91 },
    svm: { accuracy: 0.93, precision: 0.92, recall: 0.94, f1: 0.93 },
    randomForest: { accuracy: 0.94, precision: 0.93, recall: 0.95, f1: 0.94 },
  };

  const confusionMatrix = {
    truePositive: 4523,
    falsePositive: 312,
    trueNegative: 4891,
    falseNegative: 274,
  };

  const handleRetrain = async () => {
    setIsRetraining(true);
    toast({
      title: "Retraining Started",
      description: "This would trigger model retraining on the backend.",
    });
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsRetraining(false);
    
    toast({
      title: "Retraining Complete",
      description: "Models have been updated with new data.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">Model Statistics</h1>
            <p className="text-muted-foreground">
              Performance metrics and debugging information for the ML models.
            </p>
          </div>

          {/* Model Performance Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {Object.entries(modelStats).map(([name, stats]) => (
              <Card key={name} className="bg-card border-border/50 shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Brain className="w-5 h-5 text-primary" />
                    {name === "logisticRegression" && "Logistic Regression"}
                    {name === "svm" && "Support Vector Machine"}
                    {name === "randomForest" && "Random Forest"}
                    {name === "randomForest" && (
                      <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="w-3 h-3" /> Best
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Accuracy</span>
                      <span className="font-mono text-sm">{(stats.accuracy * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Precision</span>
                      <span className="font-mono text-sm">{(stats.precision * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Recall</span>
                      <span className="font-mono text-sm">{(stats.recall * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-border pt-3">
                      <span className="text-sm font-medium">F1 Score</span>
                      <span className="font-mono text-sm font-bold text-primary">
                        {(stats.f1 * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Confusion Matrix */}
          <Card className="bg-card border-border/50 shadow-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Confusion Matrix (Best Model)
              </CardTitle>
              <CardDescription>
                Performance breakdown on test dataset (10,000 samples)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="bg-success/20 border border-success/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-success">{confusionMatrix.truePositive}</div>
                  <div className="text-xs text-muted-foreground mt-1">True Positive</div>
                </div>
                <div className="bg-destructive/20 border border-destructive/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-destructive">{confusionMatrix.falsePositive}</div>
                  <div className="text-xs text-muted-foreground mt-1">False Positive</div>
                </div>
                <div className="bg-destructive/20 border border-destructive/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-destructive">{confusionMatrix.falseNegative}</div>
                  <div className="text-xs text-muted-foreground mt-1">False Negative</div>
                </div>
                <div className="bg-success/20 border border-success/30 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-success">{confusionMatrix.trueNegative}</div>
                  <div className="text-xs text-muted-foreground mt-1">True Negative</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dataset & Retraining */}
          <Card className="bg-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Dataset Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Training Samples</span>
                    <span className="font-mono">35,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Test Samples</span>
                    <span className="font-mono">10,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Features (TF-IDF)</span>
                    <span className="font-mono">5,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Trained</span>
                    <span className="font-mono text-sm">2024-01-15</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-4">
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleRetrain}
                    disabled={isRetraining}
                  >
                    {isRetraining ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Retraining...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        Retrain Models
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Requires backend server running
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;
