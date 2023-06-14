import React from 'react';
import { UserInfo } from './UserInfo';
import { MedicalCareer } from './MedicalCareer';
import { HospitalAffiliation } from './HospitalAffiliation';
import { UsageClassification } from './UsageClassification';
import { Card } from '@/components/Parts/Card/Card';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { useEditProfile } from './useEditProfile';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';

export const EditProfile: React.FC = () => {
  const editProfile = useEditProfile();
  const { profile } = editProfile;

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
        }}
      >
        <Card className="px-4 pb-8 pt-10 lg:px-[84px] lg:py-10">
          <h2
            className="mb-6 text-center text-2xl leading-8"
            data-testid="h-edit-profile-edit"
          >
            プロフィール
          </h2>

          <UserInfo {...editProfile} />
          <MedicalCareer
            {...editProfile}
            setShowModal={() => {
              return;
            }}
          />
          <HospitalAffiliation />
          <UsageClassification />
        </Card>

        <div className="my-6">
          <PrimaryButton
            type="submit"
            dataTestId="btn-profile-regist"
            className="mx-auto"
          >
            プロフィール登録
          </PrimaryButton>
        </div>
      </form>

      <div className="mt-12 text-center lg:pb-20">
        <button
          type="button"
          className="text-[#0758E4] underline"
          onClick={() => console.log('アカウント削除')}
        >
          アカウントを削除する
        </button>
      </div>
    </>
  );
};
