// /group/create_group

import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';
import { NotificationFrequency } from './useFetchGetGroup';

export type PostCreateGroupRequestData = {
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

type PostCreateGroupResponseData = {
  group_room_id: string;
};

export const usePostCreateGroup = () => {
  const { axios } = useAxios();

  const postCreateGroup = useCallback(
    (data: PostCreateGroupRequestData) => {
      return axios.post<PostCreateGroupResponseData>('/group/create_group', data);
    },
    [axios]
  );

  return { postCreateGroup };
};
