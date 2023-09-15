export type GroupEntity = {
  group_id: string;
  group_name: string;
  area: string;
  speciality: string;
  disease: string;
  explanation: string;
  is_real_name: boolean;
  is_notification_frequency_initialized: boolean;
  is_public: boolean;
  member_ids: string[];
  notification_frequency: string;
  speciality_name: string;
  templates: {
    group_id: string;
    priority: number;
    text: string;
    title: string;
  }[];
};
