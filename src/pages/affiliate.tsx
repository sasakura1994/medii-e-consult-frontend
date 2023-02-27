import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Molecules/MyPageMenu';
import { Affiliate } from '@/features/mypages/affiliate/Affiliate';
import type { NextPageWithLayout } from '@/pages/_app';

const AffiliatePage: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="mb-10 text-center text-2xl leading-[2.2rem]">
        マイページ
      </h1>
      <MyPageMenu />
      <Affiliate />
    </>
  );
};

export default AffiliatePage;

AffiliatePage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
