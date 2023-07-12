import { useState } from 'react';
type UseTutorialExplanation = {
  page: number;
  next: () => void;
  back: () => void;
};

export const useTutorialExplanation = (): UseTutorialExplanation => {
  const [page, setPage] = useState(1);

  const next = () => {
    setPage(page + 1);
  };

  const back = () => {
    setPage(page - 1);
  };
  return {
    page,
    next,
    back,
  };
};
