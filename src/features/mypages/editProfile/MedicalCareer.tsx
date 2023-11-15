import React from 'react';
import { UseEditProfile } from './useEditProfile';
import { EditProfileProps } from './EditProfile';
import { MedicalCareerQualifiedYear } from './MedicalCareerQualifiedYear';
import { MainSpecialitySelect } from './MainSpecialitySelect';

export type MedicalCareerProps = UseEditProfile & EditProfileProps;

export const MedicalCareer = (props: MedicalCareerProps) => {
  const { isHospitalDisabled, isRegisterMode, profile, setProfileFields } = props;

  if (!profile) {
    return <></>;
  }

  return (
    <>
      <div>
        {!isHospitalDisabled && (
          <div className="mt-6">
            <MedicalCareerQualifiedYear
              isEnabled={isRegisterMode}
              profile={profile}
              setProfileFields={setProfileFields}
            />
          </div>
        )}

        <div className="mt-6">
          <MainSpecialitySelect {...props} />
        </div>
      </div>
    </>
  );
};
