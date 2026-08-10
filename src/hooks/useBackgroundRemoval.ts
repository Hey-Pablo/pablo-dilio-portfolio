import { useEffect, useState } from 'react';
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

    let cancelled = false;
    let processedUrl: string | null = null;

    const processImage = async () => {
      setIsProcessing(true);
      setError(null);

      try {
        const response = await fetch(originalImageUrl);
        if (!response.ok) {
          throw new Error(`Não foi possível carregar a imagem (${response.status})`);
        }

        const blob = await response.blob();
        const imageElement = await loadImage(blob);
        const processedBlob = await removeBackground(imageElement);
        processedUrl = URL.createObjectURL(processedBlob);

        if (!cancelled) {
          setProcessedImageUrl(processedUrl);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Não foi possível processar a imagem');
          setProcessedImageUrl(originalImageUrl);
        }
      } finally {
        if (!cancelled) {
          setIsProcessing(false);
        }
      }
    };

    void processImage();

    return () => {
      cancelled = true;
      if (processedUrl) {
        URL.revokeObjectURL(processedUrl);
      }
    };
  }, [originalImageUrl]);

  return { processedImageUrl, isProcessing, error };
};
