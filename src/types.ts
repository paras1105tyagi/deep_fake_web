export type DetectionStatus = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
export type DetectionResult = {
  isReal: boolean;
  confidence: number;
} | null;