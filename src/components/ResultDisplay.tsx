import React from 'react';
import { CheckCircle2, AlertCircle, BadgePercent, ShieldCheck, AlertTriangle } from 'lucide-react';
import type { DetectionResult } from '../types';

interface ResultDisplayProps {
  result: DetectionResult;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  if (!result) return null;

  const { isReal, confidence } = result;
  const confidencePercent = (confidence * 100).toFixed(1);

  return (
    <div className={`rounded-xl p-8 transition-all duration-500 ${
      isReal 
        ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/20' 
        : 'bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-red-500/20'
    }`}>
      <div className="flex items-start gap-6">
        <div className="relative flex-shrink-0">
          {isReal ? (
            <>
              <ShieldCheck className="w-12 h-12 text-green-400" />
              <ShieldCheck className="w-12 h-12 text-green-400 absolute inset-0 animate-ping opacity-30" />
            </>
          ) : (
            <>
              <AlertTriangle className="w-12 h-12 text-red-400" />
              <AlertTriangle className="w-12 h-12 text-red-400 absolute inset-0 animate-pulse opacity-30" />
            </>
          )}
        </div>
        <div className="flex-grow">
          <h3 className="text-2xl font-bold mb-3">
            {isReal ? 'Image Appears Authentic' : 'Potential AI-Generated Image Detected'}
          </h3>
          <p className={`text-lg mb-6 ${isReal ? 'text-green-200/80' : 'text-red-200/80'}`}>
            {isReal
              ? 'Our advanced AI analysis suggests this image is likely authentic and has not been manipulated.'
              : 'Our analysis indicates this image was likely created or modified using artificial intelligence.'}
          </p>
          
          {/* Confidence Score */}
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg ${
            isReal ? 'bg-green-500/20' : 'bg-red-500/20'
          }`}>
            <BadgePercent className="w-5 h-5" />
            <div>
              <span className="font-semibold">Confidence Score:</span>
              <span className="ml-2">{confidencePercent}%</span>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${
              isReal ? 'bg-green-500/10' : 'bg-red-500/10'
            }`}>
              <h4 className="font-semibold mb-1">Analysis Method</h4>
              <p className="text-sm opacity-80">Deep Neural Network</p>
            </div>
            <div className={`p-4 rounded-lg ${
              isReal ? 'bg-green-500/10' : 'bg-red-500/10'
            }`}>
              <h4 className="font-semibold mb-1">Processing Time</h4>
              <p className="text-sm opacity-80">{"< 2 seconds"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}