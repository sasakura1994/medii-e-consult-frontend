import React from 'react';
import styles from '@/styles/pages/affiliate.module.scss';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Molecules/MyPageMenu';
import type { NextPageWithLayout } from '@/pages/_app';

const AmazonGift: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-2xl leading-[2.2rem] text-center mb-10">マイページ</h1>
      <MyPageMenu />
      <div className={styles.affiliate}>Amazonギフト</div>
    </>
  );
};

export default AmazonGift;

AmazonGift.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
