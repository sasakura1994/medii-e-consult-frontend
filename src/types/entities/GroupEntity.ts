export type GroupEntity = {
  group_id: string;
  group_name: string;
  area: string;
  disease: string;
  explanation: string;
  member_ids: string[];
  speciality_counts: { [key: string]: number };
};
