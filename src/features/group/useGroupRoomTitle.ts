import { loadLocalStorage } from '@/libs/LocalStorageManager';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

type Query = {
  group_room_id: string;
};

type UseConsultTitleProps = {
  groupRoomId: string;
  lastUpdatedDate: string;
  ownerAccountId: string;
};

export const useGroupRoomTitle = (props: UseConsultTitleProps) => {
  const { lastUpdatedDate, groupRoomId } = props;
  const router = useRouter();
  const { group_room_id } = router.query as Query;

  const isSelected = useMemo(() => {
    return group_room_id === groupRoomId;
  }, [group_room_id, groupRoomId]);

  const date = new Date(lastUpdatedDate);

  const formattedDate = date.toLocaleString(undefined, {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const currentDrafts = JSON.parse(loadLocalStorage('ChatDraft::List') || '{}');
  const isExistDraft = currentDrafts[groupRoomId] !== undefined;

  return {
    isSelected,
    formattedDate,
    isExistDraft,
  };
};
