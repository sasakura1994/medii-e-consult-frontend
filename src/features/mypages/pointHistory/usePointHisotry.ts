import { useFetchPointHistory } from './useFetchPointHistory';
import { useFetchCurrentPoint } from './useFetchCurrentPoint';
import type { PointHistoryEntityType } from './pointHistoryEntity';

export type UsePointHistoryType = {
  fetchCurrentPointLoading: boolean;
  fetchPointHistoryLoading: boolean;
  currentPoint: number | undefined;
  pointHistories: PointHistoryEntityType[] | undefined;
  getActionNameFromRefId: (refId: string) => string;
  getChatRoomLink: (refId: string) => string;
};

export const usePointHistory = (token: string): UsePointHistoryType => {
  const { isLoading: fetchCurrentPointLoading, currentPoint } =
    useFetchCurrentPoint(token);
  const { isLoading: fetchPointHistoryLoading, pointHistories } =
    useFetchPointHistory(token);

  const getActionNameFromRefId = (refId: string): string => {
    if (refId.startsWith('con:')) {
      return 'E-コンサル';
    } else if (refId.startsWith('amz:')) {
      return 'Amazonギフト交換';
    } else if (refId.startsWith('utm:')) {
      return '登録キャンペーン';
    } else if (refId.startsWith('ser:')) {
      return 'ポイント付与';
    } else if (refId.startsWith('aff:')) {
      return '紹介ポイント';
    } else {
      return '';
    }
  };

  const getChatRoomLink = (refId: string): string => {
    const chatRoomId = refId.substring(4);
    return `/chat?chat_room_id=${chatRoomId}`;
  };

  return {
    fetchCurrentPointLoading,
    fetchPointHistoryLoading,
    currentPoint,
    pointHistories,
    getActionNameFromRefId,
    getChatRoomLink,
  };
};
