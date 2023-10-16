import Label from '@/components/Parts/Label/Label';
import React from 'react';
import { TopClockHistory } from './TopClockHistory';
import { ConsultExampleEntity } from '@/types/entities/ConsultExampleEntity';
import { dateFormat } from '@/libs/date';
import Link from 'next/link';
import { useConsultExample } from '../consultExample/useConsultExample';

type Props = {
  consultExample: ConsultExampleEntity;
};

export const TopExample = (props: Props) => {
  const { consultExample } = props;
  const { getCategoryName } = useConsultExample();
  const minutes = consultExample.first_answer_minutes % 60;
  const hours = (consultExample.first_answer_minutes - minutes) / 60;

  return (
    <Link href={`/example/${consultExample.example_id}`}>
      <div
        className="h-[191px] min-w-[330px] rounded-lg border border-[#EDEDED]
     bg-white shadow-low lg:w-1/3"
      >
        <div className="p-4">
          <div className="flex justify-start">
            <Label text={getCategoryName(consultExample)} color="gray" className="line-clamp-1" />
          </div>
          <p className="mt-2 line-clamp-1 text-md text-text-secondary">{consultExample.disease_name}</p>
          <div className="mt-2 h-[71px]">
            <p className="line-clamp-2 text-l font-bold">{consultExample.background}</p>
          </div>
          <TopClockHistory>
            <p className="ml-1 text-medii-sm text-text-primary">
              初回回答まで
              <span className="text-sm font-bold text-text-link">
                {hours}時間{minutes}分
              </span>
              {consultExample.consultant_date !== '' && (
                <>（{dateFormat(consultExample.consultant_date, 'YYYY/M/D')}）</>
              )}
            </p>
          </TopClockHistory>
        </div>
      </div>
    </Link>
  );
};
