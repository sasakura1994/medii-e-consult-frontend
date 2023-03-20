import { createApiClient } from '@/libs/apiClient';
import React from 'react';

export type ResetPasswordArgs = {
  first_password: string;
  second_password: string;
  token: string;
};

export type PostResetPasswordResponseData = {
  code: number;
  message: string;
};

export const usePostResetPassword = () => {
  const resetPassword = React.useCallback((data: ResetPasswordArgs) => {
    return createApiClient().post<PostResetPasswordResponseData>(
      '/api/doctor/reset_password',
      data
    );
  }, []);

  return { resetPassword };
};
