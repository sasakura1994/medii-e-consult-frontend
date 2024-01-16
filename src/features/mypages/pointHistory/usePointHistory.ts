import { useFetchPointHistory } from './useFetchPointHistory';
import { useFetchCurrentPoint } from './useFetchCurrentPoint';
import type { PointHistoryEntityType } from './pointHistoryEntity';

export type UsePointHistoryType = {
  fetchCurrentPointLoading: boolean;
  fetchPointHistoryLoading: boolean;
  currentPoint: number | undefined;
  pointHistories: PointHistoryEntityType[] | undefined;
  getChatRoomLink: (refId: string) => string;
};

export const usePointHistory = (): UsePointHistoryType => {
  const { isLoading: fetchCurrentPointLoading, currentPoint } = useFetchCurrentPoint();
  const { isLoading: fetchPointHistoryLoading, pointHistories } = useFetchPointHistory();

  const getChatRoomLink = (refId: string): string => {
    const chatRoomId = refId.substring(4);
    return `/chat?chat_room_id=${chatRoomId}`;
  };

  return {
    fetchCurrentPointLoading,
    fetchPointHistoryLoading,
    currentPoint,
    pointHistories,
    getChatRoomLink,
  };
};
