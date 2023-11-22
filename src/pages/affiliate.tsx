import React from 'react';
import { MyPageMenu } from '@/components/Parts/Menu/MyPageMenu';
import { Affiliate } from '@/features/mypages/affiliate/Affiliate';
import type { NextPageWithLayout } from '@/pages/_app';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';

const AffiliatePage: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="mb-10 text-center text-2xl leading-9">マイページ</h1>
      <MyPageMenu />
      <Affiliate />
    </>
  );
};

export default AffiliatePage;

AffiliatePage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
