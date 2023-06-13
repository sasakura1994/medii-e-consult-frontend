import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { GroupEntity } from '@/types/entities/GroupEntity';

export type SearchGroupConditions = {
  specialityCode: string;
  disease: string;
  area: string;
  groupName: string;
};

export type UseSearchGroupType = {
  isLoading: boolean;
  error?: Error;
  groups?: GroupEntity[];
};

export const useSearchGroup = (
  conditions?: SearchGroupConditions
): UseSearchGroupType => {
  const endpoint = conditions
    ? `/group/search_groups?speciality_code=${
        conditions.specialityCode
      }&disease=${encodeURIComponent(
        conditions.disease
      )}&area=${encodeURIComponent(
        conditions.area
      )}&group_name=${encodeURIComponent(conditions.groupName)}`
    : undefined;

  const {
    isLoading,
    error,
    data: groups,
  } = useAuthenticatedSWR<GroupEntity[]>(endpoint);

  return {
    isLoading,
    error,
    groups,
  };
};
