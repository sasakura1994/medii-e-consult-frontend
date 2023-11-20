import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';

export type NotificationFrequency = 'ALL' | 'HOURLY' | 'DAILY';

export type GroupEntity = {
  group_id: string;
  is_public: boolean;
  group_name: string;
  area: string;
  speciality: string;
  speciality_name: string;
  disease: string;
  explanation: string;
  member_ids: string[];
  notification_frequency: NotificationFrequency;
  is_notification_frequency_initialized: boolean;
  is_real_name: boolean;
  assignable: boolean;
  templates: string[];
};

export type UseFetchGetGroupType = {
  group: GroupEntity | undefined;
};

export const useFetchGetGroup = (groupId: string | undefined): UseFetchGetGroupType => {
  const { data: group } = useAuthenticatedSWR<GroupEntity>(groupId ? `/group/get_group?groupId=${groupId}` : null);

  return {
    group,
  };
};
