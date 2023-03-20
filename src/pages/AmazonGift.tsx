import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Parts/Menu/MyPageMenu';
import { AmazonGift } from '@/features/mypages/amazonGift/AmazonGift';
import type { NextPageWithLayout } from '@/pages/_app';

const AmazonGiftPage: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="mb-10 text-center text-2xl leading-9">マイページ</h1>
      <MyPageMenu />
      <AmazonGift />
    </>
  );
};

export default AmazonGiftPage;

AmazonGiftPage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
