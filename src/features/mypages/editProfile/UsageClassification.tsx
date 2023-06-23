import React from 'react';
import { Radio } from '@/components/Parts/Form/Radio';
import { useEditProfile } from './useEditProfile';

type Props = ReturnType<typeof useEditProfile>;

export const UsageClassification: React.FC<Props> = ({ profile, setProfileFields }) => {
  if (!profile) {
    return <></>;
  }

  return (
    <div className="mb-10">
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

        <ul className="mt-2 pl-4 text-sm">
          <li className="relative pl-4 before:absolute before:left-0 before:content-['※']">
            コンサル回答には、審査が必要です
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['※']">
            E-コンサル回答への対応は任意です
          </li>
          <li className="relative pl-4 before:absolute before:left-0 before:content-['※']">
            回答する毎にAmazonギフト券と交換できるポイントが付与されます
            <br />
            ポイント交換について、詳しくは
            <a
              href="https://drive.google.com/file/d/1XZCPTDory1cl_NvvzcY85R39_bDktgPQ/view"
              target="_blank"
              rel="noreferrer"
              className="text-[#0758E4] underline"
            >
              こちら
            </a>
          </li>
        </ul>
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
