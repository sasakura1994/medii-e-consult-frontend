import React from 'react';
import { useFetchPointHistory } from '@/hooks/useFetchPointHistory';
import { useFetchCurrentPoint } from '@/hooks/useFetchCurrentPoint';
import { PointHistoryPresenter } from './PointHistoryPresenter';

export const PointHistoryContainer = () => {
  const { isLoading: fetchCurrentPointLoaing, currentPoint } =
    useFetchCurrentPoint();
  const { isLoading: fetchPointHistoryLoading, pointHistories } =
    useFetchPointHistory();

  if (fetchCurrentPointLoaing && !currentPoint) {
    return null;
  }

  if (fetchPointHistoryLoading && !pointHistories) {
    return null;
  }

  return (
    <PointHistoryPresenter
      currentPoint={currentPoint}
      pointHistories={pointHistories}
    />
  );
};
