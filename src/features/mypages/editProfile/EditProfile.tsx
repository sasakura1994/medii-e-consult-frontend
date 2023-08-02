import React from 'react';
import { UserInfo } from './UserInfo';
import { MedicalCareer } from './MedicalCareer';
import { HospitalAffiliation } from './HospitalAffiliation';
import { UsageClassification } from './UsageClassification';
import { Card } from '@/components/Parts/Card/Card';
import { useEditProfile } from './useEditProfile';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';
import { EditProfileNotification } from './EditProfileNotification';
import { EditProfileQuestionary } from './EditProfileQuestionary';
import PrimaryButton from '@/components/Button/PrimaryButton';
import Link from 'next/link';

export type EditProfileProps = {
  isRegisterMode: boolean;
};

export const EditProfile = (props: EditProfileProps) => {
  const { isRegisterMode } = props;
  const editProfile = useEditProfile(props);
  const { errorMessage, profile, submit } = editProfile;

  if (!profile) {
    return (
      <div className="flex justify-center">
        <SpinnerBorder />
      </div>
    );
  }

  return (
    <div className="pb-20">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Card className="px-4 pb-8 pt-10 lg:px-[84px] lg:py-10">
          <h2 className="mb-6 text-center text-2xl leading-8" data-testid="h-edit-profile-edit">
            {isRegisterMode ? 'プロフィール登録' : 'プロフィール'}
          </h2>

          <UserInfo {...editProfile} {...props} />
          <MedicalCareer {...editProfile} {...props} />
          <HospitalAffiliation {...editProfile} />
          <UsageClassification {...editProfile} />
          {isRegisterMode && (
            <>
              <EditProfileNotification {...editProfile} />
              <EditProfileQuestionary {...editProfile} />
            </>
          )}
        </Card>

        {errorMessage !== '' && <ErrorMessage className="mt-2 text-center">{errorMessage}</ErrorMessage>}

        <div className="my-6">
          <PrimaryButton type="submit" className="mx-auto" disabled={!editProfile.isCompleted} size="large">
            {isRegisterMode ? '医師資格確認へ進む' : 'プロフィール登録'}
          </PrimaryButton>
        </div>
      </form>

      {!isRegisterMode && (
        <div className="mt-12 text-center lg:pb-20">
          <Link href="/withdrawal">
            <a className="text-[#0758E4] underline">アカウントを削除する</a>
          </Link>
        </div>
      )}
    </div>
  );
};
