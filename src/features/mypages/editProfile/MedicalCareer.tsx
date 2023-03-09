import React from 'react';
import { Label } from '@/components/Parts/Form/Label';
import { TextField } from '@/components/Parts/Form/TextField';
import { SelectBox } from '@/components/Parts/Form/SelectBox';

export const MedicalCareer: React.FC = () => {
  return (
    <div className="mb-10">
      <h3 className="mb-4 text-primary">■ 医療従事経歴</h3>

      <div className="mb-4 flex gap-6">
        <TextField
          name="doctor_qualified_year"
          value="1999"
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
                     after:translate-y-[-50%]
                     after:bg-[url('/icons/pull.svg')]
                     after:content-['']"
        >
          所属科を選び直す
        </button>

        <div className="mt-2 rounded border border-solid border-[#e2e7ff] p-4">
          <p className="text-lg font-bold">所属科</p>
          <div className="mt-2 flex items-center justify-between border border-solid border-[#eff3f6]">
            <div className="flex-initial bg-[#eff3f6] py-2 px-1">
              <img src="/icons/drag_indicator.svg" alt="" />
            </div>
            <div className="flex-1 pl-4 pr-3 text-sm">
              <span className="pr-4 text-base font-bold text-primary">1</span>
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
      </div>
    </div>
  );
};
