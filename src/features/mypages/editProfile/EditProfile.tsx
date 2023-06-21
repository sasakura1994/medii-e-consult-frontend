import React from 'react';
import { UserInfo } from './UserInfo';
import { MedicalCareer } from './MedicalCareer';
import { HospitalAffiliation } from './HospitalAffiliation';
import { UsageClassification } from './UsageClassification';
import { Card } from '@/components/Parts/Card/Card';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { useEditProfile } from './useEditProfile';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';

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
    <>
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

          <UserInfo {...editProfile} />
          <MedicalCareer {...editProfile} />
          <HospitalAffiliation {...editProfile} />
          <UsageClassification {...editProfile} />
        </Card>

        {errorMessage !== '' && <ErrorMessage className="mt-2">{errorMessage}</ErrorMessage>}

        <div className="my-6">
          <PrimaryButton type="submit" dataTestId="btn-profile-regist" className="mx-auto">
            プロフィール登録
          </PrimaryButton>
        </div>
      </form>

      <div className="mt-12 text-center lg:pb-20">
        <button type="button" className="text-[#0758E4] underline" onClick={() => console.log('アカウント削除')}>
          アカウントを削除する
        </button>
      </div>
    </>
  );
};
