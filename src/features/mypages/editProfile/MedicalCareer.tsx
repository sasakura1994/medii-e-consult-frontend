import React from 'react';
import { EditProfileLabel } from '@/features/mypages/editProfile/EditProfileLabel';
import { TextField } from '@/components/Parts/Form/TextField';
import { TextArea } from '@/components/Parts/Form/TextArea';
import { useEditProfile } from './useEditProfile';
import { useMedicalCareer } from './useMedicalCareer';
import { ProfileMedicalSpecialitiesSelectDialog } from '@/components/MedicalSpeciality/ProfileMedicalSpecialitiesSelectDialog';
import { ProfileMedicalSpecialities } from '@/components/MedicalSpeciality/ProfileMedicalSpecialities';

export type MedicalCareerProps = ReturnType<typeof useEditProfile>;

export const MedicalCareer = (props: MedicalCareerProps) => {
  const { profile, selectMedicalSpecialities, setProfileFields } = props;
  const {
    isMedicalSpecialitiesSelectDialogShown,
    moveSelectedMedicalSpeciality,
    selectedMedicalSpecialities,
    setIsMedicalSpecialitiesSelectDialogShown,
    toggleMedicalSpeciality,
  } = useMedicalCareer(props);

  if (!profile) {
    return <></>;
  }

  return (
    <>
      <div className="mb-10">
        <h3 className="mb-4 text-primary">■ 医療従事経歴</h3>

        <div className="mb-4 flex gap-6">
          <TextField
            name="doctor_qualified_year"
            value={profile.qualified_year}
            onChange={(e) => setProfileFields({ ...profile, qualified_year: e.target.value })}
            disabled={true}
            id="doctor_qualified_year"
            className="!w-64"
            label="医師資格取得年"
            subscript="年"
          />
        </div>

        <div className="mb-4">
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

          <div className="mt-4">
            <EditProfileLabel required={false}>特によく診てきた疾患・領域</EditProfileLabel>
            <TextArea
              name="expertise"
              id="expertise"
              className="!h-28"
              value={profile.expertise}
              onChange={(e) => setProfileFields({ ...profile, expertise: e.target.value })}
            />
          </div>

          <div className="mt-4">
            <EditProfileLabel required={false}>専門医資格</EditProfileLabel>
            <TextArea
              name="qualification"
              id="qualification"
              className="!h-28"
              value={profile.qualification}
              onChange={(e) => setProfileFields({ ...profile, qualification: e.target.value })}
            />
          </div>
        </div>
      </div>
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
