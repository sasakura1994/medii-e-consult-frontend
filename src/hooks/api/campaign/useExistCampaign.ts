import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { dayjsDate } from '@/libs/date';
import { CampaignEntity } from '@/types/entities/CampaignEntity';
import { useMemo } from 'react';

export const useExistCampaign = () => {
  const result = useAuthenticatedSWR<CampaignEntity>('/campaign/exist-campaign', { revalidateIfStale: false });
  const { data: campaign } = result;

  const isCampaign = useMemo(() => {
    const today = new Date();

    if (!campaign) {
      return false;
    }

    if (campaign.end_at) {
      const endAt = dayjsDate(campaign.end_at);
      if (endAt && today > endAt) {
        return false;
      }
    }

    if (campaign.start_at) {
      const startAt = dayjsDate(campaign.start_at);
      if (startAt && today < startAt) {
        return false;
      }
    }

    return campaign.is_exist;
  }, [campaign]);

  return { ...result, isCampaign };
};
