import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type UpdateNotfySettingsRequestData = {
  is_mail_notify: boolean;
  is_push_notify: boolean;
  not_seminar_mail_target: boolean;
};

export const useUpdateNotifySettings = () => {
  const { axios } = useAxios();

  const updateNotifySettings = useCallback(
    (data: UpdateNotfySettingsRequestData) => {
      return axios.patch('/doctor/update-notify-settings', data);
    },
    [axios]
  );

  return {
    updateNotifySettings,
  };
};
