import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { GroupEntity } from '@/types/entities/GroupEntity';
import { KeyedMutator } from 'swr';

export type FetchedGroupEntity = Pick<
  GroupEntity,
  | 'group_id'
  | 'group_name'
  | 'area'
  | 'disease'
  | 'explanation'
  | 'is_real_name'
  | 'is_public'
  | 'member_ids'
  | 'speciality_name'
  | 'templates'
>;

export type UseFetchGroup = {
  isLoading: boolean;
  error?: Error;
  group?: FetchedGroupEntity;
  mutate?: KeyedMutator<FetchedGroupEntity>;
};

export const useFetchGroup = (groupId?: string): UseFetchGroup => {
  const {
    isLoading,
    error,
    data: group,
    mutate,
  } = useAuthenticatedSWR<FetchedGroupEntity>(groupId ? `/group/get_group?groupId=${groupId}` : null);

  return {
    isLoading,
    error,
    group,
    mutate,
  };
};
