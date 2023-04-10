import React from 'react';

export type UsePagenationType = {
  current: number;
  max: number;
  back: () => void;
  next: () => void;
  move: (target: number) => void;
};

export const usePagenation = (initialMax: number): UsePagenationType => {
  const [current, setCurrent] = React.useState(1);
  const [max] = React.useState(initialMax);

  const next = () => setCurrent((prev) => (prev < max ? prev + 1 : prev));
  const back = () => setCurrent((prev) => (1 < prev ? prev - 1 : prev));
  const move = (target: number) => setCurrent(target);
  return {
    current,
    max,
    back,
    next,
    move,
  };
};
