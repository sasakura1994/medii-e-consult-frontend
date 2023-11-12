import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type GroupMember = {
  account_id: string;
  area_code: string;
  area_txt: string;
  full_name: string;
  hospital_id: string;
  hospital_name: string;
  speciality_code: string;
};

export const useFetchGroupMemberData = () => {
  const { axios } = useAxios();
  const fetchGroupMemberData = useCallback(
    (data: { account_id: string }) => {
      const { account_id } = data;
      return axios.get<GroupMember>(account_id ? `/group/get_member_data?accountId=${account_id}` : '');
    },
    [axios]
  );

  return {
    fetchGroupMemberData,
  };
};
