export type ConsultExampleGender = 'man' | 'woman';

export type ConsultExampleEntity = {
  uid: number;
  example_id: string;
  gender: ConsultExampleGender;
  title: string;
  category_name: string;
  group_id: string;
  group_name: string;
  speciality_code: string;
  age: number | null;
  background: string;
  disease_name: string;
  like_count: number;
  comment_count: number;
  all_like_count: number;
  all_comment_count: number;
  is_published: number;
  first_answer_minutes: number;
  published_date: string;
  consultant_date: string | null;
  created_date: string;
  updated_date: string;
};
