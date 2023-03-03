import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Molecules/MyPageMenu';
import { EditProfile } from '@/features/mypages/editProfile/EditProfile';
import type { NextPageWithLayout } from '@/pages/_app';

const EditProfilePage: NextPageWithLayout = () => {
  return (
    <>
      <h1 className="mb-10 text-center text-2xl leading-[2.2rem]">
        マイページ
      </h1>
      <MyPageMenu />
      <EditProfile />
    </>
  );
};

export default EditProfilePage;

EditProfilePage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
