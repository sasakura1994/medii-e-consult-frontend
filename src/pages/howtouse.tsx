import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { HowToUse } from '@/features/howToUse';
import { useRouter } from 'next/router';
import { CustomHead } from '@/components/Layouts/Header/CustomHead';
import { LegacyLayout } from '@/components/Layouts/LegacyLayout';

const HowToUsePage: NextPageWithLayout = () => {
  const router = useRouter();
  HowToUsePage.getLayout = (page) => {
    const { test } = router.query;
    // testが1の時はレイアウトを表示しない
    if (test === '1') {
      return <>{page}</>;
    } else {
      return (
        <>
          <CustomHead />
          <LegacyLayout>{page}</LegacyLayout>
        </>
      );
    }
  };

  return <HowToUse />;
};

export default HowToUsePage;
