import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Molecules/MyPageMenu';
import { PointHistory } from '@/features/mypages/pointHistory/PointHistory';
import type { NextPageWithLayout } from '@/pages/_app';

const PointHistoryPage: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="mb-10 text-center text-2xl leading-[2.2rem]">
        マイページ
      </h1>
      <MyPageMenu />
      <PointHistory />
    </>
  );
};

export default PointHistoryPage;

PointHistoryPage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
