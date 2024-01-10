export type PointHistoryEntityType = {
  account_id: string;
  before: number;
  created_date: string;
  delta: number;
  ref_id: string;
  uid: number;
  action: string;
  remarks: string;
};

export type CurrentPointEntityType = {
  point: number;
};
