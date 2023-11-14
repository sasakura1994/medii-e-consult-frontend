import React from 'react';
import { EditProfileLabel } from '@/features/mypages/editProfile/EditProfileLabel';
import { UseEditProfile } from './useEditProfile';
import { useMedicalCareerSpecialities } from './useMedicalCareerSpecialities';
import { ProfileMedicalSpecialitiesSelectDialog } from '@/components/MedicalSpeciality/ProfileMedicalSpecialitiesSelectDialog';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';

export type MedicalCareerSpecialitiesProps = Pick<UseEditProfile, 'profile'> & {
  selectMedicalSpecialities: (medicalSpecialities: MedicalSpecialityEntity[]) => void;
};

export const MedicalCareerSpecialities = (props: MedicalCareerSpecialitiesProps) => {
  const { profile, selectMedicalSpecialities } = props;
  const {
    isMedicalSpecialitiesSelectDialogShown,
    selectedMedicalSpecialities,
    setIsMedicalSpecialitiesSelectDialogShown,
  } = useMedicalCareerSpecialities(props);

  if (!profile) {
    return <></>;
  }

  return (
    <>
      <EditProfileLabel required={false}>
        担当科
        <br className="lg:hidden" />
        <span className="font-normal">（所属科以外に対応可能な科、最大３件まで）</span>
      </EditProfileLabel>
      {selectedMedicalSpecialities.length === 0 ? (
        <div className="text-text-secondary">所属科が選択されてません</div>
      ) : (
        <ul>
          {selectedMedicalSpecialities.map((medicalSpeciality) => (
            <li key={medicalSpeciality.speciality_code}>{medicalSpeciality.name}</li>
          ))}
        </ul>
      )}

      <SecondaryButton
        type="button"
        className="mt-3"
        size="small"
        onClick={() => setIsMedicalSpecialitiesSelectDialogShown(true)}
      >
        担当科を選択
      </SecondaryButton>

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
