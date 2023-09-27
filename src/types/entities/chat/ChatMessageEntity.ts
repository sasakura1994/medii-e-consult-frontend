export type ChatMessageEntity = {
  uid: number;
  account_id: string;
  message: string;
  file_id: string;
  file_name: string;
  file_path: string;
  content_type: string;
  file_size: number;
  modified: number;
  created_date: string;
};
