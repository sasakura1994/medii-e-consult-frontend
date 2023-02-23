export type AmazonGiftStatusType = 'CONFIRMED' | 'UNCONFIRMED';

export type AmazonGiftEntityType = {
  uid: number;
  created_date: string;
  status: string;
  size: number;
  request_id: string;
  last_displayed_date: string | undefined | null;
};

export type AmazonGiftShowEntityType = {
  gift_code: string;
  code: number;
  message: string | undefined | null;
};
