import { useCallback } from 'react';

export const useLocalStorage = () => {
  const getItem = useCallback((key: string) => localStorage.getItem(key), []);
  const setItem = useCallback((key: string, value: string) => localStorage.setItem(key, value), []);
  const removeItem = useCallback((key: string) => localStorage.removeItem(key), []);

  return { getItem, removeItem, setItem };
};
