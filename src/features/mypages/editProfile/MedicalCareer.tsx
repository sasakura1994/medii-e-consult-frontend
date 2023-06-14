import React from 'react';
import { Label } from '@/components/Parts/Form/Label';
import { TextField } from '@/components/Parts/Form/TextField';
import { TextArea } from '@/components/Parts/Form/TextArea';
import { useEditProfile } from './useEditProfile';

type PropsType = ReturnType<typeof useEditProfile> & {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MedicalCareer: React.FC<PropsType> = (props) => {
  const { profile, setProfile, setShowModal } = props;

  if (!profile) {
    return <></>;
  }

  return (
    <div className="mb-10">
      <h3 className="mb-4 text-primary">■ 医療従事経歴</h3>

      <div className="mb-4 flex gap-6">
        <TextField
          name="doctor_qualified_year"
          value={profile.qualified_year}
          onChange={(e) =>
            setProfile({ ...profile, qualified_year: e.target.value })
          }
          disabled={true}
          id="doctor_qualified_year"
          className="!w-64"
          label="医師資格取得年"
          subscript="年"
        />
      </div>

      <div className="mb-4">
        <Label label="所属科" required={true} />
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
          onClick={() => setShowModal(true)}
        >
          所属科を選び直す
        </button>

        <div className="mt-2 rounded border border-solid border-[#e2e7ff] p-4">
          <p className="text-lg font-bold">所属科</p>
          <div className="mt-2 flex items-center justify-between border border-solid border-[#eff3f6]">
            <div className="flex-initial bg-[#eff3f6] px-1 py-2">
              <img src="/icons/drag_indicator.svg" alt="" />
            </div>
            <div className="flex-1 pl-4 pr-3 text-sm">
              <span className="pr-4 text-base font-bold text-primary">1</span>
              呼吸器内科（内科系）
            </div>
            <div className="flex-initial">
              <button type="button" className="mr-3 flex items-center">
                <img
                  src="/icons/close_gray.svg"
                  alt=""
                  className="mr-1 block"
                />
                <span className="leading-none text-btn-gray">削除</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-2 rounded border border-solid border-[#e2e7ff] p-4">
          <p className="text-lg font-bold">
            担当科
            <span className="text-sm font-normal">
              （対応可能な科目、最大３件まで）
            </span>
          </p>
          <div className="mt-2 flex items-center justify-between border border-solid border-[#eff3f6]">
            <div className="flex-initial bg-[#eff3f6] px-1 py-2">
              <img src="/icons/drag_indicator.svg" alt="" />
            </div>
            <div className="flex-1 pl-4 pr-3 text-sm">
              <span className="pr-4 text-base font-bold text-primary">2</span>
              総合内科（内科系）
            </div>
            <div className="flex-initial">
              <button type="button" className="mr-3 flex items-center">
                <img
                  src="/icons/close_gray.svg"
                  alt=""
                  className="mr-1 block"
                />
                <span className="leading-none text-btn-gray">削除</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <TextArea
            name="expertise"
            id="expertise"
            className="!h-28"
            label="特によく診てきた疾患・領域"
            value={profile.expertise}
            onChange={(e) =>
              setProfile({ ...profile, expertise: e.target.value })
            }
          />
        </div>

        <div className="mt-4">
          <TextArea
            name="qualification"
            id="qualification"
            className="!h-28"
            label="専門医資格"
            value={profile.qualification}
            onChange={(e) =>
              setProfile({ ...profile, qualification: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};
