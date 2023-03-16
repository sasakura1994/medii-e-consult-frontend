import { createApiClient } from '@/libs/apiClient';

type PostRequestResetPasswordRequestData = {
  mail_address: string;
};

export type PostRequestResetPasswordResponseData = {
  code: number;
  message: string;
};

/**
 * パスワードリセット要求
 */
export const usePostRequestResetPassword = () => {
  const requestResetPassword = async (mailAddress: string) => {
    const data: PostRequestResetPasswordRequestData = {
      mail_address: mailAddress,
    };

    return createApiClient().post<PostRequestResetPasswordResponseData>(
      '/api/doctor/request_reset_password',
      data
    );
  };

  return {
    requestResetPassword,
  };
};
