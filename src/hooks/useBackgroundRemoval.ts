
import { useState, useEffect } from 'react';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';

interface UseBackgroundRemovalResult {
  processedImageUrl: string | null;
  isProcessing: boolean;
  error: string | null;
}

export const useBackgroundRemoval = (originalImageUrl: string): UseBackgroundRemovalResult => {
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!originalImageUrl) return;

    const processImage = async () => {
      setIsProcessing(true);
      setError(null);
      
      try {
        console.log('Loading original image:', originalImageUrl);
        
        // Fetch the original image as blob
        const response = await fetch(originalImageUrl);
        const blob = await response.blob();
        
        // Load image element
        const imageElement = await loadImage(blob);
        console.log('Image loaded successfully');
        
        // Remove background
        const processedBlob = await removeBackground(imageElement);
        console.log('Background removed successfully');
        
        // Create URL for processed image
        const processedUrl = URL.createObjectURL(processedBlob);
        setProcessedImageUrl(processedUrl);
        
      } catch (err) {
        console.error('Failed to process image:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        // Fallback to original image
        setProcessedImageUrl(originalImageUrl);
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();

    // Cleanup function
    return () => {
      if (processedImageUrl && processedImageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(processedImageUrl);
      }
    };
  }, [originalImageUrl]);

  return { processedImageUrl, isProcessing, error };
};
