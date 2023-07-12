import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { GroupEntity } from '@/types/entities/GroupEntity';

export type UseFetchGroup = {
  isLoading: boolean;
  error?: Error;
  group?: GroupEntity;
};

export const useFetchGroup = (groupId?: string): UseFetchGroup => {
  const {
    isLoading,
    error,
    data: group,
  } = useAuthenticatedSWR<GroupEntity>(
    groupId ? `/group/get_group?groupId=${groupId}` : null
  );

  return {
    isLoading,
    error,
    group,
  };
};
