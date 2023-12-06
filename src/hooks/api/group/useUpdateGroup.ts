// /group/create_group

import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';
import { NotificationFrequency } from './useFetchGetGroup';

export type UpdateGroupRequestData = {
  group_id?: string;
  is_public: boolean;
  group_name: string;
  area: string;
  speciality: string;
  disease: string;
  explanation: string;
  member_ids: string[];
  notification_frequency: NotificationFrequency;
  assignable: boolean;
};

type UpdateGroupResponseData = {
  group_room_id: string;
};

export const useUpdateGroup = () => {
  const { axios } = useAxios();

  const updateGroup = useCallback(
    (data: UpdateGroupRequestData) => {
      return axios.post<UpdateGroupResponseData>('/group/edit_group', data);
    },
    [axios]
  );

  return { updateGroup };
};
