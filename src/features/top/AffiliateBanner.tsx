import { useExistCampaign } from '@/hooks/api/campaign/useExistCampaign';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import Link from 'next/link';
import React from 'react';

export const AffiliateBanner = () => {
  const { isCampaign, data: campaign } = useExistCampaign();
  const { postEventLog } = useEventLog();

  if (!isCampaign || !campaign) {
    return <></>;
  }

  return (
    <>
      <div
        onClick={() => {
          postEventLog({ name: 'click-top-banner', parameter: 'affiliate' });
        }}
        className="mb-6 mt-6"
      >
        <Link href="/affiliate">
          <div className="hidden md:flex">
            <img src={campaign.pc_banner_url ?? ''} alt="banner-pc" />
          </div>
          <div className="w-full md:hidden">
            <img src={campaign.sp_banner_url ?? ''} alt="banner-sp" className="w-full" />
          </div>
        </Link>
      </div>
    </>
  );
};
