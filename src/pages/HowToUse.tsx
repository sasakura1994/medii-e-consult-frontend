import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { HowToUse } from '@/features/howToUse';
import { useRouter } from 'next/router';
import { CustomHead } from '@/components/Commons/CustomHead';
import { Layout } from '@/components/Layouts/Layout';

const HowToUsePage: NextPageWithLayout = () => {
  return <HowToUse />;
};

HowToUsePage.getLayout = (page) => {
  const router = useRouter();
  const { test } = router.query;
  // testが1の時はレイアウトを表示しない
  if (test === '1') {
    return <>{page}</>;
  } else {
    return (
      <>
        <CustomHead />
        <Layout>{page}</Layout>
      </>
    );
  }
};

export default HowToUsePage;
