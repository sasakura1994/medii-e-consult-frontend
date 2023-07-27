import React from 'react';
import { EditProfileLabel } from '@/features/mypages/editProfile/EditProfileLabel';
import { UseEditProfile } from './useEditProfile';
import { useMedicalCareerSpecialities } from './useMedicalCareerSpecialities';
import { ProfileMedicalSpecialitiesSelectDialog } from '@/components/MedicalSpeciality/ProfileMedicalSpecialitiesSelectDialog';
import { ProfileMedicalSpecialities } from '@/components/MedicalSpeciality/ProfileMedicalSpecialities';

export type MedicalCareerSpecialitiesProps = Pick<UseEditProfile, 'profile' | 'selectMedicalSpecialities'>;

export const MedicalCareerSpecialities = (props: MedicalCareerSpecialitiesProps) => {
  const { profile, selectMedicalSpecialities } = props;
  const {
    isMedicalSpecialitiesSelectDialogShown,
    moveSelectedMedicalSpeciality,
    selectedMedicalSpecialities,
    setIsMedicalSpecialitiesSelectDialogShown,
    toggleMedicalSpeciality,
  } = useMedicalCareerSpecialities(props);

  if (!profile) {
    return <></>;
  }

  return (
    <>
      <EditProfileLabel required={true}>所属科</EditProfileLabel>
      <button
        type="button"
        className="relative
                     h-12
                     w-full
                     rounded
                     border
                     border-solid
                     border-btn-gray
                     px-4
                     text-left
                     after:absolute
                     after:right-3
                     after:top-1/2
                     after:z-10
                     after:block
                     after:h-[15px]
                     after:w-[14px]
                     after:-translate-y-1/2
                     after:bg-[url('/icons/pull.svg')]
                     after:content-['']"
        onClick={() => setIsMedicalSpecialitiesSelectDialogShown(true)}
      >
        <span className={selectedMedicalSpecialities.length === 0 ? 'text-monotone-500' : ''}>
          {selectedMedicalSpecialities.length === 0 ? '所属科を選択してください' : '所属科を選び直す'}
        </span>
      </button>

      <ProfileMedicalSpecialities
        selectedMedicalSpecialities={selectedMedicalSpecialities}
        moveSelectedMedicalSpeciality={moveSelectedMedicalSpeciality}
        toggleMedicalSpeciality={toggleMedicalSpeciality}
      />

      {isMedicalSpecialitiesSelectDialogShown && (
        <ProfileMedicalSpecialitiesSelectDialog
          defaultSelectedMedicalSpecialities={selectedMedicalSpecialities}
          onChange={(medicalSpecialities) => {
            selectMedicalSpecialities(medicalSpecialities);
            setIsMedicalSpecialitiesSelectDialogShown(false);
          }}
          setShowModal={setIsMedicalSpecialitiesSelectDialogShown}
        />
      )}
    </>
  );
};
