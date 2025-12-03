import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Database, Cpu, Zap, FileText, 
  ArrowRight, CheckCircle2, Code2, Server
} from "lucide-react";

const About = () => {
  const algorithmSteps = [
    {
      step: 1,
      title: "Data Collection",
      description: "Load Kaggle Fake News Dataset containing labeled real and fake news articles.",
      icon: Database
    },
    {
      step: 2,
      title: "Text Preprocessing",
      description: "Clean text by removing duplicates, punctuation, stopwords. Tokenize and lemmatize words.",
      icon: FileText
    },
    {
      step: 3,
      title: "Feature Extraction",
      description: "Convert text to numerical vectors using TF-IDF (Term Frequency-Inverse Document Frequency).",
      icon: Cpu
    },
    {
      step: 4,
      title: "Model Training",
      description: "Train 3 models: Logistic Regression, SVM, and Random Forest on the processed data.",
      icon: Zap
    },
    {
      step: 5,
      title: "Model Selection",
      description: "Evaluate all models using accuracy, precision, recall, and F1-score. Select best model.",
      icon: CheckCircle2
    },
    {
      step: 6,
      title: "Prediction",
      description: "New input text is cleaned, vectorized, and classified as FAKE or REAL with confidence score.",
      icon: ArrowRight
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="font-display text-4xl font-bold mb-4">How It Works</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Understanding the machine learning pipeline behind fake news detection.
            </p>
          </div>

          {/* Algorithm Steps */}
          <div className="space-y-4 mb-16">
            {algorithmSteps.map((item, index) => (
              <Card key={item.step} className="bg-card border-border/50 shadow-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono bg-secondary px-2 py-0.5 rounded">
                        Step {item.step}
                      </span>
                      <h3 className="font-display font-semibold text-lg">{item.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Data Flow */}
          <Card className="bg-card border-border/50 shadow-card mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" />
                Data Flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/30 rounded-xl p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-muted-foreground">
{`User Input (Raw Text)
    │
    ▼
┌─────────────────────────────┐
│  Text Preprocessing         │
│  • Lowercase conversion     │
│  • Remove punctuation       │
│  • Remove stopwords         │
│  • Tokenization             │
│  • Lemmatization            │
└─────────────────────────────┘
    │
    ▼
┌─────────────────────────────┐
│  TF-IDF Vectorization       │
│  • Transform text → numbers │
│  • Same vectorizer as train │
└─────────────────────────────┘
    │
    ▼
┌─────────────────────────────┐
│  ML Model Prediction        │
│  • Load saved model         │
│  • Predict class            │
│  • Get probability score    │
└─────────────────────────────┘
    │
    ▼
┌─────────────────────────────┐
│  Result Generation          │
│  • FAKE or REAL label       │
│  • Confidence percentage    │
│  • Key word extraction      │
│  • Explanation text         │
└─────────────────────────────┘`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Architecture */}
          <Card className="bg-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" />
                System Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">Frontend (React)</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      User interface for news input
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Result visualization
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Admin dashboard
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      API communication
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">Backend (Python/Flask)</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      REST API endpoints
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      ML model loading
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Text preprocessing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Model retraining
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
