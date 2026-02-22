import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FolderTree, Terminal, FileCode, 
  CheckCircle2, AlertCircle, Server, Globe, Brain, ShieldCheck
} from "lucide-react";

const Docs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <h1 className="font-display text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-muted-foreground text-lg">
              Complete setup guide for the credibility analysis backend.
            </p>
          </div>

          {/* How The Analysis Prompt Works */}
          <Card className="bg-primary/5 border-primary/20 shadow-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Analysis Methodology
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                The system follows a structured credibility analysis approach:
              </p>
              <pre className="bg-secondary/30 rounded-xl p-4 font-mono text-xs overflow-x-auto text-muted-foreground">
{`Analyze the following news text for credibility.

Steps:
1. Extract all factual claims.
2. Identify the original source and any cited evidence.
3. Check if claims are verifiable or vague.
4. Evaluate language for emotional manipulation or clickbait.
5. Assess consistency with well-established facts.
6. Output:
   - Credibility score (0–100)
   - Classification: Reliable / Questionable / Likely Fake
   - Short justification with specific reasons
   - What additional verification is needed`}
              </pre>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Forces claim-level analysis</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Prevents "gut feeling" answers</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Produces explainable results</p>
                <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> Reduces hallucinations</p>
              </div>
            </CardContent>
          </Card>

          {/* Project Structure */}
          <Card className="bg-card border-border/50 shadow-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderTree className="w-5 h-5 text-primary" />
                Project Structure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-secondary/30 rounded-xl p-4 font-mono text-sm overflow-x-auto text-muted-foreground">
{`fake-news-detector/
├── backend/
│   ├── app.py                 # Flask application
│   ├── train_model.py         # Model training script
│   ├── preprocess.py          # Text preprocessing
│   ├── requirements.txt       # Python dependencies
│   ├── models/
│   │   ├── best_model.pkl     # Trained model
│   │   └── vectorizer.pkl     # TF-IDF vectorizer
│   └── data/
│       └── fake_news.csv      # Training dataset
│
├── frontend/                  # This React app
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md`}
              </pre>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="bg-card border-border/50 shadow-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-primary" />
                requirements.txt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-secondary/30 rounded-xl p-4 font-mono text-sm overflow-x-auto text-muted-foreground">
{`flask==2.3.3
flask-cors==4.0.0
scikit-learn==1.3.0
pandas==2.0.3
numpy==1.24.3
nltk==3.8.1
joblib==1.3.2
gunicorn==21.2.0`}
              </pre>
            </CardContent>
          </Card>

          {/* Setup Commands */}
          <Card className="bg-card border-border/50 shadow-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-primary" />
                Setup Commands
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">1. Clone & Setup</h4>
                <pre className="bg-secondary/30 rounded-xl p-4 font-mono text-sm text-muted-foreground">
{`python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install -r requirements.txt
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet')"`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">2. Train Model</h4>
                <pre className="bg-secondary/30 rounded-xl p-4 font-mono text-sm text-muted-foreground">
{`# Download dataset from Kaggle
# https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset
python train_model.py`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">3. Run Server</h4>
                <pre className="bg-secondary/30 rounded-xl p-4 font-mono text-sm text-muted-foreground">
{`# Development
python app.py

# Production
gunicorn app:app --bind 0.0.0.0:5000`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Backend Code */}
          <Card className="bg-card border-border/50 shadow-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-primary" />
                app.py (Flask Backend)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-secondary/30 rounded-xl p-4 font-mono text-xs overflow-x-auto text-muted-foreground max-h-96 overflow-y-auto">
{`from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from preprocess import clean_text, get_important_words, extract_claims

app = Flask(__name__)
CORS(app)

model = joblib.load('models/best_model.pkl')
vectorizer = joblib.load('models/vectorizer.pkl')

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        cleaned = clean_text(text)
        features = vectorizer.transform([cleaned])
        
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0]
        
        important_words = get_important_words(
            text, vectorizer, model, prediction
        )
        
        claims = extract_claims(text)
        confidence = float(max(probability) * 100)
        
        # 3-tier classification
        if confidence > 65:
            result = 'Likely Reliable' if prediction == 0 else 'Likely Fake'
        else:
            result = 'Questionable'
        
        return jsonify({
            'prediction': result,
            'confidence': round(confidence, 1),
            'importantWords': important_words,
            'claims': claims,
            'needsVerification': generate_verification_needs(text, claims),
            'explanation': generate_explanation(result, important_words, confidence, claims)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)`}
              </pre>
            </CardContent>
          </Card>

          {/* Deployment */}
          <Card className="bg-card border-border/50 shadow-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Deployment Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Deploy on Render
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Push backend folder to GitHub</li>
                  <li>Go to render.com and create new Web Service</li>
                  <li>Connect your repository</li>
                  <li>Set build command: <code className="bg-secondary px-1 rounded">pip install -r requirements.txt</code></li>
                  <li>Set start command: <code className="bg-secondary px-1 rounded">gunicorn app:app</code></li>
                  <li>Deploy!</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Deploy on Heroku
                </h4>
                <pre className="bg-secondary/30 rounded-xl p-4 font-mono text-sm text-muted-foreground">
{`echo "web: gunicorn app:app" > Procfile
heroku login
heroku create fake-news-detector-api
git push heroku main`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Testing Checklist */}
          <Card className="bg-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Testing Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Functionality</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Returns 3-tier classification
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Extracts and classifies claims
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Credibility score 0-100
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Explains reasoning with evidence
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Lists what needs verification
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Error Handling</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      Handle missing model files
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      Handle malformed requests
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      Handle very long inputs
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      Never outputs "true" or "false" alone
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

export default Docs;
