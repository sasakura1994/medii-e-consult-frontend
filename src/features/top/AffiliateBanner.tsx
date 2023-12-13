import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import Link from 'next/link';
import React from 'react';

export const AffiliateBanner = () => {
  const { postEventLog } = useEventLog();
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
            <img src="images/top/banner-pc.png" alt="banner-pc" />
          </div>
          <div className="w-full md:hidden">
            <img src="images/top/banner-sp.png" alt="banner-sp" className="w-full" />
          </div>
        </Link>
      </div>
    </>
  );
};
