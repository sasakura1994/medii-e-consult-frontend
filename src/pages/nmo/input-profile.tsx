import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { Card } from '@/components/Parts/Card/Card';
import { MedicalCareer } from '@/features/mypages/editProfile/MedicalCareer';
import { useEditProfile } from '@/features/mypages/editProfile/useEditProfile';
import { UserInfoNames } from '@/features/mypages/editProfile/UserInfoNames';
import { EditProfileHeading } from '@/features/mypages/editProfile/EditProfileHeading';

const NmoInputProfilePage: NextPageWithLayout = () => {
  const editProfile = useEditProfile({ isRegisterMode: false });

  return (
    <div className="lg:py-10">
      <Card className="mx-auto px-4 pb-8 pt-10 lg:w-lg-breakpoint lg:px-[84px] lg:py-10">
        <h1 className="mb-10 text-center text-2xl leading-9">プロフィール入力</h1>
        <EditProfileHeading className="mb-4">利用者情報</EditProfileHeading>
        <UserInfoNames isEnabled={true} {...editProfile} />
        <MedicalCareer isRegisterMode={true} {...editProfile} />
      </Card>
    </div>
  );
};

export default NmoInputProfilePage;
