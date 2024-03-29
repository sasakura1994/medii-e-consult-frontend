import React from 'react';
import { MyPageMenu } from '@/components/Parts/Menu/MyPageMenu';
import { PointHistory } from '@/features/mypages/pointHistory/PointHistory';
import type { NextPageWithLayout } from '@/pages/_app';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';

const PointHistoryPage: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="mb-10 text-center text-2xl leading-9">マイページ</h1>
      <MyPageMenu />
      <PointHistory />
    </>
  );
};

export default PointHistoryPage;

PointHistoryPage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
