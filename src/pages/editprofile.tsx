import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Parts/Menu/MyPageMenu';
import { Profile } from '@/features/mypages/editProfile/Profile';
import type { NextPageWithLayout } from '@/pages/_app';
import { UrlPublish } from '@/features/mypages/editProfile/UrlPublish';
import { useEditProfilePage } from '@/features/mypages/editProfile/useEditProfilePage';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';

const EditProfilePage: NextPageWithLayout = () => {
  const { isRegisterMode } = useEditProfilePage();
  const { profile } = useFetchProfile();

  return (
    <>
      <h1 className="mb-10 text-center text-2xl leading-9">マイページ</h1>
      <MyPageMenu />
      {!isRegisterMode && profile?.want_to_be_consultant && <UrlPublish />}
      <Profile />
    </>
  );
};

export default EditProfilePage;

EditProfilePage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
