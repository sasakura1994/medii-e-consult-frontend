import { useState, useCallback } from 'react';

export type Era = 'year' | 'showa' | 'heisei' | 'reiwa';

const eraOffsets: { [key in Era]: number } = {
  year: 0,
  showa: 1925,
  heisei: 1988,
  reiwa: 2018,
};

export const useEraConverter = () => {
  const [inputYear, setInputYear] = useState('');
  const [era, setEra] = useState<Era>('year');
  const [validation, setValidation] = useState({
    min: 1,
    max: 9999,
  });
  const convertYear = useCallback((year: string, fromEra: Era, toEra: Era) => {
    if (!year) return '';
    const adjustedYear = Number(year) + eraOffsets[fromEra] - eraOffsets[toEra];
    switch (toEra) {
      case 'year': {
        setValidation({
          min: 1,
          max: 9999,
        });
        return adjustedYear > 0 ? String(adjustedYear) : '';
      }
      case 'showa': {
        setValidation({
          min: 1,
          max: 64,
        });
        return adjustedYear > 0 && adjustedYear <= 64
          ? String(adjustedYear)
          : '';
      }
      case 'heisei': {
        setValidation({
          min: 1,
          max: 31,
        });
        return adjustedYear > 0 && adjustedYear <= 31
          ? String(adjustedYear)
          : '';
      }
      case 'reiwa': {
        setValidation({
          min: 1,
          max: 99,
        });
        return adjustedYear > 0 ? String(adjustedYear) : '';
      }
      default:
        return '';
    }
  }, []);

  const handleEraChange = (eraStr: string) => {
    const value = eraStr as Era;
    const year = convertYear(inputYear, era, value);
    setEra(value);

    setInputYear(String(year));
  };

  return {
    era,
    inputYear,
    setInputYear,
    handleEraChange,
    validation,
    convertYear,
  };
};
