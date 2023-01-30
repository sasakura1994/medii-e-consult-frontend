import React from 'react';
import styles from '@/styles/pages/affiliate.module.scss';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Molecules/MyPageMenu';
import type { NextPageWithLayout } from '@/pages/_app';

const Affiliate: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-2xl leading-[2.2rem] text-center mb-10">マイページ</h1>
      <MyPageMenu />
      <div className={styles.affiliate}>医師紹介</div>
    </>
  );
};

export default Affiliate;

Affiliate.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
