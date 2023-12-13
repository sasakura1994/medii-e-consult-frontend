// /group/Exit_group

import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type PostExitGroupRequestData = {
  account_id: string;
  group_id: string;
};

export const usePostExitGroup = () => {
  const { axios } = useAxios();

  const postExitGroup = useCallback(
    (data: PostExitGroupRequestData) => {
      return axios.post('/group/exit_group', data);
    },
    [axios]
  );

  return { postExitGroup };
};
