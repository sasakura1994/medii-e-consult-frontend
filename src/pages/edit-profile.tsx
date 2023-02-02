import React from 'react';
import styles from '@/styles/pages/affiliate.module.scss';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Molecules/MyPageMenu';
import type { NextPageWithLayout } from '@/pages/_app';

const EditProfile: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="text-2xl leading-[2.2rem] text-center mb-10">マイページ</h1>
      <MyPageMenu />
      <div className={styles.affiliate}>プロフィール</div>
    </>
  );
};

export default EditProfile;

EditProfile.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
