import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Parts/Menu/MyPageMenu';
import type { NextPageWithLayout } from '@/pages/_app';
import { UrlPublish } from '@/features/mypages/editProfile/UrlPublish';
import { useEditProfilePage } from '@/features/mypages/editProfile/useEditProfilePage';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { ProfileDetail } from '@/features/mypages/editProfile/ProfileDetail';
import { EditProfile } from '@/features/mypages/editProfile/EditProfile';

const EditProfilePage: NextPageWithLayout = () => {
  const editProfilePage = useEditProfilePage();
  const { editProfileMode, isRegisterMode, setSelectedEditProfileMode } =
    editProfilePage;
  const { profile } = useFetchProfile();

  return (
    <>
      <h1 className="mb-10 text-center text-2xl leading-9">マイページ</h1>
      <MyPageMenu />
      {!isRegisterMode && profile?.want_to_be_consultant && <UrlPublish />}
      <div className="mt-4">
        {editProfileMode === 'profile' && (
          <ProfileDetail onEdit={() => setSelectedEditProfileMode('edit')} />
        )}
        {editProfileMode === 'edit' && <EditProfile />}
      </div>
    </>
  );
};

export default EditProfilePage;

EditProfilePage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
