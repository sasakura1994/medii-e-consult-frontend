import React from 'react';
import { UseEditProfile } from './useEditProfile';
import { EditProfileProps } from './EditProfile';
import { MedicalCareerQualifiedYear } from './MedicalCareerQualifiedYear';
import { useMedicalSpecialitySelectButton } from '@/components/MedicalSpeciality/useMedicalSpecialitySelectButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { EditProfileLabel } from './EditProfileLabel';
import { MedicalSpecialitySelectDialog } from '@/components/MedicalSpeciality/MedicalSpecialitySelectDialog';

export type MedicalCareerProps = UseEditProfile & EditProfileProps;

export const MedicalCareer = (props: MedicalCareerProps) => {
  const { isHospitalDisabled, isRegisterMode, profile, setProfileFields } = props;

  const { isOpen, medicalSpecialityName, setIsOpen } = useMedicalSpecialitySelectButton({
    specialityCode: profile?.main_speciality ?? '',
  });

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
          <EditProfileLabel required id="main-speciality">
            所属科
          </EditProfileLabel>
          {medicalSpecialityName !== '' ? (
            <div className="mt-2">{medicalSpecialityName}</div>
          ) : (
            <div className="mt-2 text-caption">所属科が選択されてません</div>
          )}
          <SecondaryButton type="button" className="mt-2" onClick={() => setIsOpen(true)}>
            所属科を選択
          </SecondaryButton>
        </div>
      </div>
      {isOpen && (
        <MedicalSpecialitySelectDialog
          onChange={(specialityCode) => {
            setIsOpen(false);
            setProfileFields({ main_speciality: specialityCode });
          }}
          setShowModal={setIsOpen}
          description={<>所属科は、あとから編集可能です。</>}
          defaultSpecialityCode={profile.main_speciality}
        />
      )}
    </>
  );
};
