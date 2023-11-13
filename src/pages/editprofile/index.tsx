import React, { ReactNode } from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { MyPageMenu } from '@/components/Parts/Menu/MyPageMenu';
import type { NextPageWithLayout } from '@/pages/_app';
import { UrlPublish } from '@/features/mypages/editProfile/UrlPublish';
import { useEditProfilePage } from '@/features/mypages/editProfile/useEditProfilePage';
import { ProfileDetail } from '@/features/mypages/editProfile/ProfileDetail';
import { EditProfile } from '@/features/mypages/editProfile/EditProfile';
import RegistrationProgress from '@/features/document/RegistrationProgress';
import { Heading } from '@/components/Parts/Text/Heading';
import { ProfileRegistrationLayout } from '@/components/Layouts/ProfileRegistrationLayout';

const Layout = ({ isRegisterMode, children }: { isRegisterMode: boolean; children: ReactNode }) => {
  if (isRegisterMode) {
    return <ProfileRegistrationLayout>{children}</ProfileRegistrationLayout>;
  }

  return <MyPageLayout>{children}</MyPageLayout>;
};

const EditProfilePage: NextPageWithLayout = () => {
  const editProfilePage = useEditProfilePage();
  const { editProfileMode, isRegisterMode, profile, setSelectedEditProfileMode } = editProfilePage;

  return (
    <Layout isRegisterMode={isRegisterMode}>
      {isRegisterMode ? (
        <>
          <Heading className="text-center">ユーザー情報の登録</Heading>
          <div className="mt-8">
            <RegistrationProgress mode="edit" />
          </div>
        </>
      ) : (
        <>
          <h1 className="mb-10 text-center text-2xl leading-9">マイページ</h1>
          {profile && profile.status === 'VERIFIED' && profile.last_name !== '' && <MyPageMenu />}
        </>
      )}
      {!isRegisterMode && profile?.want_to_be_consultant && <UrlPublish />}
      {editProfileMode === 'profile' && <ProfileDetail onEdit={() => setSelectedEditProfileMode('edit')} />}
      {editProfileMode === 'edit' && <EditProfile isRegisterMode={isRegisterMode} />}
    </Layout>
  );
};

export default EditProfilePage;

EditProfilePage.getLayout = (page: React.ReactElement) => {
  return page;
};
