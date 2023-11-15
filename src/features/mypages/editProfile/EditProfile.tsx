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
import { Heading } from '@/components/Parts/Text/Heading';
import { Radio } from '@/components/Parts/Form/Radio';
import { EditProfileStudent } from './EditProfileStudent';

export type EditProfileProps = {
  isRegisterMode: boolean;
};

export const EditProfile = (props: EditProfileProps) => {
  const { isRegisterMode } = props;
  const editProfile = useEditProfile(props);
  const { accountType, errorMessage, isHospitalDisabled, profile, setAccountType, submit } = editProfile;
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
            <Heading as="h2">医療従事経歴</Heading>
          </div>

          <div className="mt-6 flex gap-4">
            <Radio
              name="account_type"
              label="医師"
              value="doctor"
              checked={accountType === 'doctor'}
              onChange={() => setAccountType('doctor')}
            />
            <Radio
              name="account_type"
              label="医学生"
              value="student"
              checked={accountType === 'student'}
              onChange={() => setAccountType('student')}
            />
          </div>

          {accountType === 'doctor' ? (
            <>
              <div className="mt-6">
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
            </>
          ) : (
            <div className="mt-6">
              <EditProfileStudent {...editProfile} />
            </div>
          )}
        </div>

        {errorMessage !== '' && <ErrorMessage className="mt-2 text-center">{errorMessage}</ErrorMessage>}

        <div className="my-6">
          <PrimaryButton type="submit" className="mx-auto" disabled={!editProfile.isCompleted}>
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
