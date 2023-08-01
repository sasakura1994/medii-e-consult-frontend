import React from 'react';
import { toast } from 'react-toastify';

export type UseClipboardType = {
  isError: boolean;
  clipboard: (message?: string) => void;
};

export const useClipboard = (url: string): UseClipboardType => {
  const [isError, setIsError] = React.useState(false);

  const clipboard = React.useCallback(
    async (message?: string) => {
      setIsError(false);
      try {
        await navigator.clipboard.writeText(url);
        if (message) {
          toast(message);
        }
      } catch (e: unknown) {
        setIsError(true);
        toast('コピーに失敗しました。');
      }
    },
    [url]
  );

  return {
    isError,
    clipboard,
  };
};
