import Label from '@/components/Parts/Label/Label';
import React from 'react';
import { TopClockHistory } from './TopClockHistory';
import { ConsultExampleEntity } from '@/types/entities/ConsultExampleEntity';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';

type Props = {
  consultExample: ConsultExampleEntity;
};

export const TopExample = (props: Props) => {
  const { consultExample } = props;
  const { getMedicalSpecialityName } = useMedicalSpeciality();
  const minutes = consultExample.first_answer_minutes % 60;
  const hours = (consultExample.first_answer_minutes - minutes) / 60;

  return (
    <div
      className="lg:w-1/3 h-[191px] min-w-[330px] rounded-lg border
     border-[#EDEDED] bg-bg-secondary shadow-low"
    >
      <div className="p-4">
        <div className="w-28">
          <Label
            text={
              getMedicalSpecialityName(consultExample.speciality_code) ?? ''
            }
            color="gray"
          />
        </div>
        <p className="mt-2 text-md text-text-secondary">
          {consultExample.disease_name}
        </p>
        <div className="mt-2 h-[71px]">
          <p className="text-l font-bold line-clamp-2">
            {consultExample.background}
          </p>
        </div>
        <TopClockHistory>
          <p className="ml-1 text-medii-sm text-text-primary">
            初回回答まで
            <span className="text-sm font-bold text-text-link">
              {hours}時間{minutes}分
            </span>
            （2時間前に質問）
          </p>
        </TopClockHistory>
      </div>
    </div>
  );
};
