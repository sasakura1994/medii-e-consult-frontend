import { useAxios } from '@/hooks/network/useAxios';
import { ProfileEntity } from '@/types/entities/profileEntity';
import React from 'react';

export type PostLoginResponseData = {
  code: number;
  message?: string;
  jwt_token: string;
  doctor: ProfileEntity;
};

export const usePostLogin = () => {
  const { axios } = useAxios();

  const login = React.useCallback(
    (mail_address: string, password: string, queries: { [key: string]: string }) => {
      const flattenedQueries = Object.entries(queries).reduce(
        (acc, [key, value]) => {
          if (Array.isArray(value)) {
            acc[key] = value[value.length - 1];
          } else {
            acc[key] = value;
          }
          return acc;
        },
        {} as { [key: string]: string }
      );

      return axios.post<PostLoginResponseData>('/doctor/login', {
        mail_address,
        password,
        queries: flattenedQueries,
      });
    },
    [axios]
  );

  return { login };
};
