import React from 'react';
import { Radio } from '@/components/Parts/Form/Radio';
import { UseEditProfile } from './useEditProfile';

const now = new Date();
const doctorApprovalYear = now.getFullYear() - (now.getMonth() <= 3 ? 7 : 6);

export const UsageClassification = (props: UseEditProfile) => {
  const { profile, setProfileFields } = props;

  if (!profile) {
    return <></>;
  }

  return (
    <div className="mb-10" data-testid="edit-profile-usage-classification">
      <h3 className="mb-4 text-primary">■ E-コンサル利用区分</h3>

      <div className="mb-4">
        <Radio
          name="want_to_be_consultant"
          id="respondent_doctor"
          label={
            <>
              <span className="font-bold">回答&相談：</span>
              E-コンサルへの回答も行います
            </>
          }
          value="1"
          onChange={() => setProfileFields({ want_to_be_consultant: true })}
          checked={profile.want_to_be_consultant}
        />

        <p className="mb-4 ml-4 mt-2 text-[13px] font-medium">
          ※ご回答いただくエキスパート専門医の登録には、審査を行っております
          <br />
          ※医師卒後年数7年目(～{doctorApprovalYear}年度医師登録)以上を一つの条件とし、総合的に判定しております
          <br />
          ※エキスパート専門医に登録いただいても、E-コンサルへのご回答は任意です
          <br />
          ※回答する毎にAmazonギフト券と交換できるポイントが付与されます
        </p>
      </div>

      <div className="mb-4">
        <Radio
          name="want_to_be_consultant"
          id="consulting_doctor"
          label={
            <>
              <span className="font-bold">相談医：</span>
              E-コンサルでの相談依頼者です
            </>
          }
          value="0"
          onChange={() => setProfileFields({ want_to_be_consultant: false })}
          checked={!profile.want_to_be_consultant}
        />
      </div>
    </div>
  );
};
