import Label from '@/components/Parts/Label/Label';
import React from 'react';
import { TopClockHistory } from './TopClockHistory';
import { NewerConsult } from '@/hooks/api/chat/useFetchNewerConsults';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { getTimeIntervalText } from '@/libs/date';

type Props = {
  consult: NewerConsult;
};

export const TopNewerConsult = (props: Props) => {
  const { consult } = props;
  const { getMedicalSpecialityName } = useMedicalSpeciality();

  return (
    <div className="h-[201px] min-w-[232px] rounded-lg border border-[#EDEDED] bg-white shadow-high">
      <div className="p-4">
        <div className="flex items-center space-x-1">
          <p
            className="h-6 w-10 whitespace-nowrap rounded-full bg-medii-sky-base
           px-2 py-0.5 text-center text-medii-sm text-white"
          >
            新着
          </p>
          <TopClockHistory>
            <p className="ml-1 text-medii-sm text-text-primary">{getTimeIntervalText(consult.date)}に質問</p>
          </TopClockHistory>
        </div>
        <div className="mt-2 h-[107px]">
          <p className="line-clamp-4 text-l font-bold">{consult.consult_name}</p>
        </div>

        <div className="w-28">
          <Label
            text={getMedicalSpecialityName(consult.speciality_code) ?? ''}
            color="gray"
            size="sm"
            className="font-bold"
          />
        </div>
      </div>
    </div>
  );
};
