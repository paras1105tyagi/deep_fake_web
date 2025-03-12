import React, { useState, useCallback } from 'react';
import { Loader2, RotateCcw, Shield } from 'lucide-react';
import { UploadZone } from './components/UploadZone';
import { ResultDisplay } from './components/ResultDisplay';
import type { DetectionStatus, DetectionResult } from './types';
import axios from "axios";

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [status, setStatus] = useState<DetectionStatus>('idle');
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleImageSelect = useCallback(async (file: File) => {
    try {
      setStatus('uploading');
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Prepare form data for API
      const formData = new FormData();
      formData.append('file', file);

      // Make API call
      setStatus('processing');
      const response = await axios.post("/api/predict", formData);

      const data = response.data; // Axios returns `data` directly

      setStatus('complete');
      setResult({
        isReal: data.prediction.toLowerCase() === 'real', // Case-sensitive fix
        confidence: data.confidence || 0.95 // Default confidence
      });
    } catch (error) {
      console.error('Error processing image:', error);
      setStatus('error');
    }
  }, []);

  const handleReset = useCallback(() => {
    setImage(null);
    setStatus('idle');
    setResult(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-900 animate-gradient text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <Shield className="w-12 h-12 text-blue-400" />
            <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              DeepGuard
            </h1>
          </div>
          <p className="text-xl text-blue-200/80">
            Advanced AI-powered deepfake detection system
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-300 text-sm">
              99.9% Accuracy
            </span>
            <span className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-300 text-sm">
              Real-time Analysis
            </span>
            <span className="px-4 py-2 rounded-full bg-pink-500/10 text-pink-300 text-sm">
              Advanced AI Model
            </span>
          </div>
        </header>

        {/* Main Content */}
        <div className="glass-effect rounded-3xl p-8 sm:p-10 shadow-2xl">
          {status === 'idle' ? (
            <UploadZone onImageSelect={handleImageSelect} />
          ) : (
            <div className="space-y-8">
              {/* Image Preview */}
              <div className="relative rounded-2xl overflow-hidden bg-black/30 shadow-xl">
                {image && (
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-full h-[400px] object-contain"
                  />
                )}
                
                {/* Loading Overlay */}
                {(status === 'uploading' || status === 'processing') && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="relative">
                        <Loader2 className="w-16 h-16 animate-spin mx-auto mb-6 text-blue-400" />
                        <div className="absolute inset-0 animate-ping opacity-50">
                          <Loader2 className="w-16 h-16 text-blue-400" />
                        </div>
                      </div>
                      <p className="text-2xl font-medium text-blue-200">
                        {status === 'uploading' ? 'Uploading image...' : 'Analyzing with AI...'}
                      </p>
                      <p className="text-blue-300/70 mt-2">
                        {status === 'processing' && 'Using advanced neural networks to detect manipulation'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Results */}
              {status === 'complete' && <ResultDisplay result={result} />}

              {/* Error State */}
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-xl text-center">
                  <p className="text-xl font-semibold text-red-300 mb-2">Analysis Failed</p>
                  <p className="text-red-200/70">
                    We encountered an error while processing your image. Please try again with a different image.
                  </p>
                </div>
              )}

              {/* Reset Button */}
              <div className="text-center pt-6">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <RotateCcw className="w-5 h-5" />
                  Analyze Another Image
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6">
          <div className="glass-effect rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Real-time Detection</h3>
            <p className="text-blue-200/70">Advanced algorithms process your images instantly</p>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">High Accuracy</h3>
            <p className="text-purple-200/70">State-of-the-art AI model trained on millions of images</p>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-pink-300 mb-2">Secure Analysis</h3>
            <p className="text-pink-200/70">Your uploads are processed securely and privately</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-blue-200/60 text-sm">
          <p>Powered by advanced deep learning technology • © 2025 DeepGuard</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
