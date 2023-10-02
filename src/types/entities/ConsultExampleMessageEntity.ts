export type ConsultExampleMessageAccountType = 'doctor' | 'consultant';

export type ConsultExampleMessageEntity = {
  uid: number;
  account_type: ConsultExampleMessageAccountType;
  doctor_name: string;
  message: string;
  file_id: string;
  file_name: string;
  file_path: string;
  content_type: string;
  like_count: number;
  comment_count: number;
  deleted: number;
  created_date: string;
  is_liked: boolean;
};
