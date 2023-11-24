import React from 'react';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { EditProfileLabel } from './EditProfileLabel';
import { MedicalSpecialitySelectDialog } from '@/components/MedicalSpeciality/MedicalSpecialitySelectDialog';
import { UseEditProfile } from './useEditProfile';
import { useMedicalSpecialitySelectButton } from '@/components/MedicalSpeciality/useMedicalSpecialitySelectButton';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';

type Props = UseEditProfile;

export const MainSpecialitySelect = (props: Props) => {
  const { addBlurFields, blurFields, profile, setProfileFields } = props;
  const { medicalSpecialities } = useFetchMedicalSpecialities();
  const { isOpen, medicalSpecialityName, setIsOpen } = useMedicalSpecialitySelectButton({
    specialityCode: profile?.main_speciality ?? '',
  });

  if (!profile) {
    return <></>;
  }

  const hasError = blurFields.includes('main_speciality') && profile.main_speciality === '';

  return (
    <>
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
      {hasError && <ErrorMessage className="mt-2 text-xs">選択してください</ErrorMessage>}

      {isOpen && (
        <MedicalSpecialitySelectDialog
          onChange={(specialityCode) => {
            setIsOpen(false);
            setProfileFields({ main_speciality: specialityCode });
          }}
          setShowModal={(isShow) => {
            setIsOpen(isShow);
            if (!isShow) {
              addBlurFields('main_speciality');
            }
          }}
          description={<>所属科は、あとから編集可能です。</>}
          medicalSpecialities={medicalSpecialities}
          disabledSpecialityCodes={[profile.speciality_2, profile.speciality_3, profile.speciality_4]}
          defaultSpecialityCode={profile.main_speciality}
        />
      )}
    </>
  );
};
