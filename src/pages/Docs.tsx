import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FolderTree, Terminal, Download, FileCode, 
  CheckCircle2, AlertCircle, Server, Globe
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
              Complete setup guide for the Fake News Detection backend.
            </p>
          </div>

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
{`# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Download NLTK data
python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords'); nltk.download('wordnet')"`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">2. Train Model</h4>
                <pre className="bg-secondary/30 rounded-xl p-4 font-mono text-sm text-muted-foreground">
{`# Download dataset from Kaggle first
# https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset

# Train the models
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

          {/* Python Backend Code */}
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
import numpy as np
from preprocess import clean_text, get_important_words

app = Flask(__name__)
CORS(app)

# Load model and vectorizer
model = joblib.load('models/best_model.pkl')
vectorizer = joblib.load('models/vectorizer.pkl')

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Preprocess
        cleaned = clean_text(text)
        
        # Vectorize
        features = vectorizer.transform([cleaned])
        
        # Predict
        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0]
        
        # Get important words
        important_words = get_important_words(
            text, vectorizer, model, prediction
        )
        
        confidence = float(max(probability) * 100)
        result = 'FAKE' if prediction == 1 else 'REAL'
        
        return jsonify({
            'prediction': result,
            'confidence': round(confidence, 1),
            'importantWords': important_words,
            'explanation': generate_explanation(result, important_words, confidence)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    # Return model statistics
    return jsonify({
        'modelStats': {...},
        'confusionMatrix': {...}
    })

@app.route('/api/retrain', methods=['POST'])
def retrain():
    # Trigger model retraining
    # This would call train_model.py
    return jsonify({'status': 'Retraining started'})

def generate_explanation(result, words, confidence):
    # Generate human-readable explanation
    ...

if __name__ == '__main__':
    app.run(debug=True, port=5000)`}
              </pre>
            </CardContent>
          </Card>

          {/* Train Model Code */}
          <Card className="bg-card border-border/50 shadow-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-primary" />
                train_model.py
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-secondary/30 rounded-xl p-4 font-mono text-xs overflow-x-auto text-muted-foreground max-h-96 overflow-y-auto">
{`import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import joblib
from preprocess import clean_text

def load_and_clean_data():
    """Load dataset and clean it"""
    # Load Kaggle fake news dataset
    fake = pd.read_csv('data/Fake.csv')
    real = pd.read_csv('data/True.csv')
    
    fake['label'] = 1  # 1 = Fake
    real['label'] = 0  # 0 = Real
    
    df = pd.concat([fake, real])
    
    # Remove duplicates
    df.drop_duplicates(inplace=True)
    
    # Remove empty rows
    df.dropna(subset=['text'], inplace=True)
    
    # Clean text
    df['cleaned'] = df['text'].apply(clean_text)
    
    return df

def train_models(X_train, X_test, y_train, y_test):
    """Train multiple models and return best one"""
    models = {
        'logistic_regression': LogisticRegression(max_iter=1000),
        'svm': SVC(kernel='linear', probability=True),
        'random_forest': RandomForestClassifier(n_estimators=100)
    }
    
    results = {}
    
    for name, model in models.items():
        print(f"Training {name}...")
        model.fit(X_train, y_train)
        
        y_pred = model.predict(X_test)
        
        results[name] = {
            'model': model,
            'accuracy': accuracy_score(y_test, y_pred),
            'precision': precision_score(y_test, y_pred),
            'recall': recall_score(y_test, y_pred),
            'f1': f1_score(y_test, y_pred)
        }
        
        print(f"  Accuracy: {results[name]['accuracy']:.4f}")
        print(f"  F1 Score: {results[name]['f1']:.4f}")
    
    # Select best model by F1 score
    best = max(results.items(), key=lambda x: x[1]['f1'])
    print(f"\\nBest model: {best[0]} (F1: {best[1]['f1']:.4f})")
    
    return best[1]['model'], results

def main():
    print("Loading data...")
    df = load_and_clean_data()
    
    print(f"Dataset size: {len(df)}")
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        df['cleaned'], df['label'], 
        test_size=0.2, random_state=42
    )
    
    print("Vectorizing text...")
    vectorizer = TfidfVectorizer(max_features=5000)
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)
    
    print("Training models...")
    best_model, all_results = train_models(
        X_train_vec, X_test_vec, y_train, y_test
    )
    
    print("Saving model and vectorizer...")
    joblib.dump(best_model, 'models/best_model.pkl')
    joblib.dump(vectorizer, 'models/vectorizer.pkl')
    
    print("Done!")

if __name__ == '__main__':
    main()`}
              </pre>
            </CardContent>
          </Card>

          {/* Preprocessing Code */}
          <Card className="bg-card border-border/50 shadow-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-primary" />
                preprocess.py
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-secondary/30 rounded-xl p-4 font-mono text-xs overflow-x-auto text-muted-foreground max-h-96 overflow-y-auto">
{`import re
import string
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

# Download required NLTK data
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

def clean_text(text):
    """Clean and preprocess text for ML model"""
    # Lowercase
    text = text.lower()
    
    # Remove URLs
    text = re.sub(r'http\\S+|www\\S+', '', text)
    
    # Remove email addresses
    text = re.sub(r'\\S+@\\S+', '', text)
    
    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))
    
    # Remove numbers
    text = re.sub(r'\\d+', '', text)
    
    # Tokenize
    tokens = word_tokenize(text)
    
    # Remove stopwords and lemmatize
    tokens = [
        lemmatizer.lemmatize(token) 
        for token in tokens 
        if token not in stop_words and len(token) > 2
    ]
    
    return ' '.join(tokens)

def get_important_words(text, vectorizer, model, prediction):
    """Extract words that most influenced the prediction"""
    feature_names = vectorizer.get_feature_names_out()
    
    # Get TF-IDF scores for input text
    tfidf_vector = vectorizer.transform([clean_text(text)])
    tfidf_scores = tfidf_vector.toarray()[0]
    
    # Get model coefficients (for linear models)
    if hasattr(model, 'coef_'):
        coef = model.coef_[0]
    else:
        # For Random Forest, use feature importances
        coef = model.feature_importances_
    
    # Find words with highest impact
    word_weights = []
    for i, score in enumerate(tfidf_scores):
        if score > 0:
            word = feature_names[i]
            weight = abs(score * coef[i])
            suspicious = coef[i] > 0 if prediction == 1 else coef[i] < 0
            word_weights.append({
                'word': word,
                'weight': float(weight),
                'suspicious': suspicious
            })
    
    # Sort by weight and return top 8
    word_weights.sort(key=lambda x: x['weight'], reverse=True)
    return word_weights[:8]`}
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
{`# Create Procfile
echo "web: gunicorn app:app" > Procfile

# Login to Heroku
heroku login

# Create app
heroku create fake-news-detector-api

# Deploy
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
                  <h4 className="font-semibold mb-3">Functionality Tests</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      API returns prediction for valid text
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      API returns error for empty input
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Confidence score is between 0-100
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Important words are extracted
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Error Handling</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      Handle missing model files gracefully
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      Handle malformed JSON requests
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      Handle very long text inputs
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      CORS errors handled properly
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
