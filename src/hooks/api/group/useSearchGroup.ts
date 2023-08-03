import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { GroupEntity } from '@/types/entities/GroupEntity';

export type SearchGroupConditions = {
  specialityCode: string;
  disease: string;
  area: string;
  groupName: string;
};

export type SearchedGroupEntity = Pick<
  GroupEntity,
  'group_id' | 'group_name' | 'area' | 'disease' | 'explanation' | 'is_real_name'
> & {
  member_ids: string[];
  speciality_counts: { [key: string]: number };
};

export type UseSearchGroupType = {
  isLoading: boolean;
  error?: Error;
  groups?: SearchedGroupEntity[];
};

export const useSearchGroup = (conditions?: SearchGroupConditions): UseSearchGroupType => {
  const endpoint = conditions
    ? `/group/search_groups?speciality_code=${conditions.specialityCode}&disease=${encodeURIComponent(
        conditions.disease
      )}&area=${encodeURIComponent(conditions.area)}&group_name=${encodeURIComponent(conditions.groupName)}`
    : undefined;

  const { isLoading, error, data: groups } = useAuthenticatedSWR<SearchedGroupEntity[]>(endpoint);

  return {
    isLoading,
    error,
    groups,
  };
};
