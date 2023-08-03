import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { GroupEntity } from '@/types/entities/GroupEntity';

export type FetchedGroupEntity = Pick<
  GroupEntity,
  'group_id' | 'group_name' | 'area' | 'disease' | 'explanation' | 'is_real_name'
>;

export type UseFetchGroup = {
  isLoading: boolean;
  error?: Error;
  group?: FetchedGroupEntity;
};

export const useFetchGroup = (groupId?: string): UseFetchGroup => {
  const {
    isLoading,
    error,
    data: group,
  } = useAuthenticatedSWR<FetchedGroupEntity>(groupId ? `/group/get_group?groupId=${groupId}` : null);

  return {
    isLoading,
    error,
    group,
  };
};
