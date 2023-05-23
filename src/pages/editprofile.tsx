import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Parts/Menu/MyPageMenu';
import { Profile } from '@/features/mypages/editProfile/Profile';
import type { NextPageWithLayout } from '@/pages/_app';

const EditProfilePage: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="mb-10 text-center text-2xl leading-9">マイページ</h1>
      <MyPageMenu />
      <Profile />
    </>
  );
};

export default EditProfilePage;

EditProfilePage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
