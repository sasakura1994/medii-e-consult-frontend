import React from 'react';
import { UserInfo } from './UserInfo';
import { MedicalCareer } from './MedicalCareer';
import { HospitalAffiliation } from './HospitalAffiliation';
import { UsageClassification } from './UsageClassification';
import { useEditProfile } from './useEditProfile';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import Link from 'next/link';

export type EditProfileProps = {
  isRegisterMode: boolean;
};

export const EditProfile = (props: EditProfileProps) => {
  const { isRegisterMode } = props;
  const editProfile = useEditProfile(props);
  const { errorMessage, isHospitalDisabled, profile, submit } = editProfile;
  const { profile: fetchedProfile } = useFetchProfile();

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
        <div className="px-4 pt-8 lg:w-[600px] lg:px-0">
          {!isRegisterMode && (
            <h2 className="mb-6 text-center text-2xl leading-8" data-testid="h-edit-profile-edit">
              プロフィール
            </h2>
          )}

          <UserInfo {...editProfile} {...props} />
          <div className="mt-8">
            <MedicalCareer {...editProfile} {...props} />
          </div>
          {!isHospitalDisabled && (
            <div className="mt-8">
              <HospitalAffiliation {...editProfile} />
            </div>
          )}
          {fetchedProfile?.registration_source !== 'nmo' && (
            <div className="mt-8">
              <UsageClassification {...editProfile} />
            </div>
          )}
        </div>

        {errorMessage !== '' && <ErrorMessage className="mt-2 text-center">{errorMessage}</ErrorMessage>}

        <div className="my-6">
          <PrimaryButton type="submit" className="mx-auto" disabled={!editProfile.isCompleted} size="large">
            {isRegisterMode ? '医師資格確認へ進む' : 'プロフィール登録'}
          </PrimaryButton>
        </div>
        <div className="mt-10 text-center">
          <Link href="/withdrawal/confirm" className="text-md text-distructive underline">
            アカウントを削除
          </Link>
        </div>
      </form>
    </div>
  );
};
