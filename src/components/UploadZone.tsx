import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, CheckCircle } from 'lucide-react';

interface UploadZoneProps {
  onImageSelect: (file: File) => void;
}

export function UploadZone({ onImageSelect }: UploadZoneProps) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    onDrop: files => files[0] && onImageSelect(files[0])
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 transform hover:scale-[1.02]
          ${isDragActive 
            ? 'border-blue-400 bg-blue-500/10' 
            : 'border-blue-500/20 hover:border-blue-400/50 hover:bg-blue-500/5'}`}
      >
        <input {...getInputProps()} />
        <div className="relative">
          <Upload className={`w-20 h-20 mx-auto mb-6 transition-colors duration-300
            ${isDragActive ? 'text-blue-400' : 'text-blue-500/50'}`} />
          {isDragActive && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Upload className="w-20 h-20 text-blue-400 animate-ping opacity-50" />
            </div>
          )}
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-blue-200">
          {isDragActive ? 'Drop your image here' : 'Upload an image for analysis'}
        </h3>
        <div className="flex flex-col items-center gap-3">
          <p className="text-blue-300/70">
            Drag & drop or click to select
          </p>
          <div className="flex items-center gap-4 text-sm text-blue-300/50">
            <span className="flex items-center gap-1">
              <ImageIcon className="w-4 h-4" /> JPG
            </span>
            <span className="flex items-center gap-1">
              <ImageIcon className="w-4 h-4" /> PNG
            </span>
            <span className="flex items-center gap-1">
              <ImageIcon className="w-4 h-4" /> WebP
            </span>
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          'Instant Analysis',
          'High Accuracy',
          'Secure Upload',
          'AI-Powered'
        ].map((feature, index) => (
          <div key={index} className="flex items-center gap-2 justify-center text-sm text-blue-300/70">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}