import { useState, useCallback } from 'react';
import { downloadPdf } from '../utils/fileHelpers';

export function usePdfDownload() {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const executeDownload = useCallback(async (
    asyncBlobGenerator: () => Promise<Blob>,
    filename: string
  ) => {
    setDownloading(true);
    setError(null);
    setSuccess(false);

    try {
      const blob = await asyncBlobGenerator();
      downloadPdf(blob, filename);
      setSuccess(true);
    } catch (err: any) {
      console.error('Download processing error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setDownloading(false);
    }
  }, []);

  const clearDownloadStates = useCallback(() => {
    setError(null);
    setSuccess(false);
    setDownloading(false);
  }, []);

  return {
    downloading,
    error,
    success,
    setError,
    setSuccess,
    executeDownload,
    clearDownloadStates,
  };
}
