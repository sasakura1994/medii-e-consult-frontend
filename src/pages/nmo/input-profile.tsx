import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { Card } from '@/components/Parts/Card/Card';
import { UserInfoNames } from '@/features/mypages/editProfile/UserInfoNames';
import { EditProfileHeading } from '@/features/mypages/editProfile/EditProfileHeading';
import { MedicalCareerQualifiedYear } from '@/features/mypages/editProfile/MedicalCareerQualifiedYear';
import { MedicalCareerSpecialities } from '@/features/mypages/editProfile/MedicalCareerSpecialities';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { useNmoInputProfile } from '@/features/mypages/nmo/useNmoInputProfile';

const NmoInputProfilePage: NextPageWithLayout = () => {
  const inputProfile = useNmoInputProfile();
  const { errorMessage, isSending, submitNmoInputProfile } = inputProfile;

  return (
    <div className="lg:py-10">
      <Card className="mx-auto px-4 pb-[100px] pt-10 lg:w-lg-breakpoint lg:px-[84px] lg:pb-10 lg:pt-10">
        <h1 className="mb-10 text-center text-2xl leading-9">プロフィール入力</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitNmoInputProfile();
          }}
        >
          <EditProfileHeading className="mb-4">利用者情報</EditProfileHeading>
          <UserInfoNames isEnabled={true} {...inputProfile} />
          <EditProfileHeading className="my-8">医療従事経歴</EditProfileHeading>
          <MedicalCareerQualifiedYear isEnabled={true} {...inputProfile} />
          <div className="mt-4">
            <MedicalCareerSpecialities {...inputProfile} />
          </div>
          <div className="mt-10 flex justify-center">
            {isSending ? (
              <SpinnerBorder />
            ) : (
              <PrimaryButton type="submit" size="large">
                プロフィール登録
              </PrimaryButton>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NmoInputProfilePage;
