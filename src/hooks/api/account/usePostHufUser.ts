import { useAxios } from '@/hooks/network/useAxios';
import React from 'react';

export type HufUserArgs = {
  first_password: string;
  second_password: string;
  huf_token: string;
};

export type PostHufUserResponseData = {
  code: number;
  jwt_token: string;
  message: string;
};

export const usePostHufUser = () => {
  const { axios } = useAxios();

  const createHufUser = React.useCallback(
    (data: HufUserArgs) => {
      return axios.post<PostHufUserResponseData>('/doctor/create_huf_user', data);
    },
    [axios]
  );

  return { createHufUser };
};
