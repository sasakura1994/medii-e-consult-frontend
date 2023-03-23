import React from 'react';
import { useProfile } from './useProfile';
import { UserInfo } from './UserInfo';
import { MedicalCareer } from './MedicalCareer';
import { HospitalAffiliation } from './HospitalAffiliation';
import { UsageClassification } from './UsageClassification';

export const Edit: React.FC = () => {
  const { editProfileScreen } = useProfile();

  if (!editProfileScreen.isEditOpen) {
    return null;
  }

  return (
    <>
      <h2
        className="mb-6 text-center text-2xl leading-8"
        data-testid="h-edit-profile-edit"
      >
        プロフィール
      </h2>

      <UserInfo />
      <MedicalCareer />
      <HospitalAffiliation />
      <UsageClassification />
    </>
  );
};
