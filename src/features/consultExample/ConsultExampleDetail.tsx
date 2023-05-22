import { Card } from '@/components/Parts/Card/Card';
import { ConsultExampleDetailEntity } from '@/types/entities/ConsultExampleDetailEntity';
import { ConsultExampleMessageEntity } from '@/types/entities/ConsultExampleMessageEntity';
import React from 'react';
import { ConsultExampleTag } from './ConsultExampleTag';
import { useConsultExample } from '@/hooks/api/consultExample/useConsultExample';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { ConsultExampleFirstAnswerTime } from './ConsultExampleFirstAnswerTime';
import { dateFormat } from '@/libs/date';
import { ConsultExampleActions } from './ConsultExampleActions';

type Props = {
  consultExample: ConsultExampleDetailEntity;
  consultExampleMessages: ConsultExampleMessageEntity[];
};

export const ConsultExampleDetail: React.FC<Props> = ({
  consultExample,
  consultExampleMessages,
}: Props) => {
  const { getMedicalSpecialityName } = useMedicalSpeciality();
  const { getAgeText, getGenderText } = useConsultExample();

  return (
    <>
      <Card className="p-10">
        <div className="flex gap-2">
          <ConsultExampleTag>
            {getMedicalSpecialityName(consultExample.speciality_code) ||
              consultExample.category_name}
          </ConsultExampleTag>
          <div className="flex flex-1 lg:justify-between">
            {consultExample.first_answer_minutes > 0 ? (
              <ConsultExampleFirstAnswerTime
                firstAnswerMinutes={consultExample.first_answer_minutes}
              />
            ) : (
              <div></div>
            )}
            <div className="flex items-center text-sm text-primary">
              <img
                src="/icons/good_out_primary.svg"
                width="24"
                height="24"
                alt="いいねの数"
              />
              <div className="ml-1">{consultExample.all_like_count}</div>
              <img
                src="/icons/comment_primary.svg"
                width="24"
                height="24"
                className="ml-4 block"
                alt="コメントの数"
              />
              <div className="ml-1">{consultExample.all_comment_count}</div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-2xl font-bold">{consultExample.title}</div>
        <div className="mt-10 flex justify-between text-sm">
          <div className="flex gap-1">
            {consultExample.age !== null && (
              <div>{getAgeText(consultExample.age)}</div>
            )}
            <div>
              {getGenderText(consultExample.gender, consultExample.age)}
            </div>
            <div>{consultExample.disease_name}</div>
          </div>
          <div className="text-right">
            <div className="whitespace-nowrap">
              事例公開日：
              {dateFormat(consultExample.published_date, 'YYYY/M/D')}
            </div>
            {/* consultant_date は必須のためそのうちここの条件分岐は削除したい */}
            {consultExample.consultant_date && (
              <div className="whitespace-nowrap">
                コンサル実施日：
                {dateFormat(consultExample.consultant_date, 'YYYY/M/D')}
              </div>
            )}
          </div>
        </div>
        <div className="mt-5">{consultExample.background}</div>
        <div className="mt-4">
          <ConsultExampleActions consultExample={consultExample} />
        </div>
      </Card>
    </>
  );
};
