export type CampaignEntity = {
  is_exist: boolean;
  pc_banner_url: string | null;
  sp_banner_url: string | null;
  start_at: string | null;
  end_at: string | null;
  child_register_point: number | null;
  child_consult_point: number | null;
};
