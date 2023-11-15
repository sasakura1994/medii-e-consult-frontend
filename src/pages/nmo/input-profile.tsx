import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { Card } from '@/components/Parts/Card/Card';
import { UserInfoNames } from '@/features/mypages/editProfile/UserInfoNames';
import { EditProfileHeading } from '@/features/mypages/editProfile/EditProfileHeading';
import { MedicalCareerQualifiedYear } from '@/features/mypages/editProfile/MedicalCareerQualifiedYear';
import { MedicalCareerSpecialities } from '@/features/mypages/editProfile/MedicalCareerSpecialities';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { useNmoInputProfile } from '@/features/nmo/useNmoInputProfile';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';
import { EditProfileBirthday } from '@/features/mypages/editProfile/EditProfileBirthday';
import { MainSpecialitySelect } from '@/features/mypages/editProfile/MainSpecialitySelect';

const NmoInputProfilePage: NextPageWithLayout = () => {
  const inputProfile = useNmoInputProfile();
  const { errorMessage, isSending, selectInChargeMedicalSpecialities, submitNmoInputProfile } = inputProfile;

  return (
    <div className="lg:py-10">
      <Card className="mx-auto px-4 pb-[100px] pt-10 lg:w-lg-breakpoint lg:px-[84px] lg:pb-10 lg:pt-10">
        <h1 className="mb-10 text-center text-2xl leading-9">プロフィール入力</h1>
        <div className="my-8">コンサル作成時に必要な情報であるため、以下のプロフィールについて入力をお願いします。</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitNmoInputProfile();
          }}
        >
          <EditProfileHeading className="mb-4">利用者情報</EditProfileHeading>
          <UserInfoNames isEnabled={true} {...inputProfile} />
          <div className="mt-4">
            <EditProfileBirthday isEnabled={true} {...inputProfile} />
          </div>
          <EditProfileHeading className="my-8">医療従事経歴</EditProfileHeading>
          <MedicalCareerQualifiedYear isEnabled={true} {...inputProfile} />
          <div className="mt-6">
            <MainSpecialitySelect {...inputProfile} />
          </div>
          <div className="mt-6">
            <MedicalCareerSpecialities
              {...inputProfile}
              selectMedicalSpecialities={selectInChargeMedicalSpecialities}
            />
          </div>
          {errorMessage !== '' && <ErrorMessage className="mt-8 text-center">{errorMessage}</ErrorMessage>}
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
