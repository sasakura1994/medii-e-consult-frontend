import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';

export type SearchGroupMember = {
  account_id: string;
  area_code: string;
  area_txt: string;
  full_name: string;
  hospital_id: string;
  hospital_name: string;
  speciality_code: string;
};

export type UseFetchSearchMemberType = {
  isLoading: boolean;
  error?: Error;
  members?: SearchGroupMember[];
};
export type SearchQuery =
  | {
      specialityCode?: string;
      name?: string;
      area?: string;
    }
  | undefined;

export const useFetchSearchMember = (searchQuery: SearchQuery): UseFetchSearchMemberType => {
  const endpoint = searchQuery
    ? `/group/search_member?speciality_code=${searchQuery.specialityCode ?? ''}&full_name=${encodeURIComponent(
        searchQuery.name ?? ''
      )}&area_code=${encodeURIComponent(searchQuery.area ?? '')}`
    : '';

  const { isLoading, error, data: members } = useAuthenticatedSWR<SearchGroupMember[]>(endpoint);

  return {
    isLoading,
    error,
    members,
  };
};
