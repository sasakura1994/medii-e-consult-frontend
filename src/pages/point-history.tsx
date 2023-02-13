import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Molecules/MyPageMenu';
import { PointHistoryContainer } from '@/components/Organisms/MyPage/PointHistoryContainer';
import type { NextPageWithLayout } from '@/pages/_app';

const PointHistory: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-2xl leading-[2.2rem] text-center mb-10">
        マイページ
      </h1>
      <MyPageMenu />
      <PointHistoryContainer />
    </>
  );
};

export default PointHistory;

PointHistory.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
