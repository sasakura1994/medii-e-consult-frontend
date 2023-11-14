import React from 'react';
import { Radio } from '@/components/Parts/Form/Radio';
import { UseEditProfile } from './useEditProfile';
import { Heading } from '@/components/Parts/Text/Heading';
import Label from '@/components/Parts/Label/Label';
import { EditProfileLabel } from './EditProfileLabel';
import { TextArea } from '@/components/Parts/Form/TextArea';
import { MedicalCareerSpecialities } from './MedicalCareerSpecialities';

const now = new Date();
const doctorApprovalYear = now.getFullYear() - (now.getMonth() <= 3 ? 7 : 6);

export const UsageClassification = (props: UseEditProfile) => {
  const { profile, setProfileFields, selectInChargeMedicalSpecialities } = props;

  if (!profile) {
    return <></>;
  }

  return (
    <div data-testid="edit-profile-usage-classification">
      <Heading as="h2">E-コンサル利用区分</Heading>

      <div className="mt-6">
        <Radio
          name="want_to_be_consultant"
          id="consulting_doctor"
          label={
            <div className="flex items-center gap-2">
              <div>相談医（E-コンサルでの相談依頼者です）</div>
              <Label size="sm">まずはこちら</Label>
            </div>
          }
          value="0"
          onChange={() => setProfileFields({ want_to_be_consultant: false })}
          checked={!profile.want_to_be_consultant}
        />
      </div>

      <div className="mt-2">
        <Radio
          name="want_to_be_consultant"
          id="respondent_doctor"
          label="回答＆相談（E-コンサルへの回答も行います）"
          value="1"
          onChange={() => setProfileFields({ want_to_be_consultant: true })}
          checked={profile.want_to_be_consultant}
        />
      </div>

      {profile.want_to_be_consultant && (
        <div className="mt-2 rounded-lg border border-border-divider p-4">
          <Heading as="h3">回答医情報</Heading>
          <div className="mt-6">
            <MedicalCareerSpecialities
              profile={profile}
              selectMedicalSpecialities={selectInChargeMedicalSpecialities}
            />
          </div>
          <div className="mt-6">
            <EditProfileLabel required={false}>特によく診てきた疾患・領域</EditProfileLabel>
            <TextArea
              name="expertise"
              id="expertise"
              className="!h-[64px]"
              value={profile.expertise}
              placeholder="特によく診てきた疾患・領域を入力"
              onChange={(e) => setProfileFields({ expertise: e.target.value })}
            />
          </div>
          <div className="mt-6">
            <EditProfileLabel required={false}>専門医資格</EditProfileLabel>
            <TextArea
              name="qualification"
              id="qualification"
              className="!h-[64px]"
              value={profile.qualification}
              placeholder="専門医資格を入力"
              onChange={(e) => setProfileFields({ qualification: e.target.value })}
            />
          </div>
        </div>
      )}

      <div className="mt-4">
        <ul className="ml-6 list-disc text-text-secondary">
          <li>ご回答いただくエキスパート専門医の登録には、審査を行っております</li>
          <li>医師卒後年数7年目(～{doctorApprovalYear}年度医師登録)以上を一つの条件とし、総合的に判定しております</li>
          <li>エキスパート専門医に登録いただいても、E-コンサルへのご回答は任意です</li>
          <li>回答する毎にAmazonギフト券と交換できるポイントが付与されます</li>
        </ul>
      </div>
    </div>
  );
};
