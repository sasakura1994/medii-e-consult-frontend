import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';
import { NotificationFrequency } from './useFetchGetGroup';

export type UpdateNotificationFrequencyRequestData = {
  notification_frequency: NotificationFrequency;
};

export const useUpdateNotificationFrequency = () => {
  const { axios } = useAxios();

  const updateNotificationFrequency = useCallback(
    (data: UpdateNotificationFrequencyRequestData, group_id: string) => {
      return group_id ? axios.patch(`/group/${group_id}/update_notification_frequency`, data) : null;
    },
    [axios]
  );

  return { updateNotificationFrequency };
};
