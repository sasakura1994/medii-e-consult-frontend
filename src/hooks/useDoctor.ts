import React from 'react';

export const useDoctor = () => {
  const calculateExperienceYear = React.useCallback((qualifiedYear: number) => {
    const experienceYear = Math.max(
      1,
      new Date().getFullYear() - qualifiedYear + 1
    );

    const month = new Date().getMonth() + 1;
    if (month < 4) {
      return experienceYear - 1;
    }

    return experienceYear;
  }, []);

  return { calculateExperienceYear };
};
