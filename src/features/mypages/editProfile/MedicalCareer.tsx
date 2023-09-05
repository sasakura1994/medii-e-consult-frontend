import React from 'react';
import { EditProfileLabel } from '@/features/mypages/editProfile/EditProfileLabel';
import { TextArea } from '@/components/Parts/Form/TextArea';
import { UseEditProfile } from './useEditProfile';
import { EditProfileProps } from './EditProfile';
import { EditProfileHeading } from './EditProfileHeading';
import { MedicalCareerQualifiedYear } from './MedicalCareerQualifiedYear';
import { MedicalCareerSpecialities } from './MedicalCareerSpecialities';

export type MedicalCareerProps = UseEditProfile & EditProfileProps;

export const MedicalCareer = (props: MedicalCareerProps) => {
  const { isRegisterMode, profile, selectMedicalSpecialities, setProfileFields } = props;

  if (!profile) {
    return <></>;
  }

  return (
    <>
      <div className="mb-10">
        <EditProfileHeading className="mb-4">医療従事経歴</EditProfileHeading>

        <div className="mb-4">
          <MedicalCareerSpecialities profile={profile} selectMedicalSpecialities={selectMedicalSpecialities} />
        </div>

        <div className="mb-4">
          <MedicalCareerQualifiedYear
            isEnabled={isRegisterMode}
            profile={profile}
            setProfileFields={setProfileFields}
          />
        </div>

        <div className="mt-4">
          <EditProfileLabel required={false}>特によく診てきた疾患・領域</EditProfileLabel>
          <TextArea
            name="expertise"
            id="expertise"
            className="!h-28"
            value={profile.expertise}
            placeholder="よく診てきた疾患・領域情報を入力してください"
            onChange={(e) => setProfileFields({ expertise: e.target.value })}
          />
        </div>

        <div className="mt-4">
          <EditProfileLabel required={false}>専門医資格</EditProfileLabel>
          <TextArea
            name="qualification"
            id="qualification"
            className="!h-28"
            value={profile.qualification}
            placeholder="保有している専門医資格を入力してください"
            onChange={(e) => setProfileFields({ qualification: e.target.value })}
          />
        </div>
      </div>
    </>
  );
};
