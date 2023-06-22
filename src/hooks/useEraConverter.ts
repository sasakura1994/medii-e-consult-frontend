import { useState, useCallback, useMemo } from 'react';

export type Era = 'year' | 'showa' | 'heisei' | 'reiwa';

const eraOffsets: { [key in Era]: number } = {
  year: 0,
  showa: 1925,
  heisei: 1988,
  reiwa: 2018,
};

export const useEraConverter = () => {
  const [era, setEra] = useState<Era>('year');

  const validation = useMemo(() => {
    switch (era) {
      case 'year':
        return {
          min: 1,
          max: 9999,
        };
      case 'showa':
        return {
          min: 1,
          max: 64,
        };
      case 'heisei':
        return {
          min: 1,
          max: 31,
        };
      case 'reiwa':
        return {
          min: 1,
          max: 99,
        };
    }
  }, [era]);

  const convertYear = useCallback((year: string, fromEra: Era, toEra: Era) => {
    if (!year) return '';
    const adjustedYear = Number(year) + eraOffsets[fromEra] - eraOffsets[toEra];
    switch (toEra) {
      case 'year':
        return adjustedYear > 0 ? String(adjustedYear) : '';
      case 'showa':
        return adjustedYear > 0 && adjustedYear <= 64 ? String(adjustedYear) : '';
      case 'heisei':
        return adjustedYear > 0 && adjustedYear <= 31 ? String(adjustedYear) : '';
      case 'reiwa':
        return adjustedYear > 0 ? String(adjustedYear) : '';
      default:
        return '';
    }
  }, []);

  return {
    era,
    setEra,
    validation,
    convertYear,
  };
};
