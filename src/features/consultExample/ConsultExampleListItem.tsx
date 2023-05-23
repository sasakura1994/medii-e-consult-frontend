import { ConsultExampleEntity } from '@/types/entities/ConsultExampleEntity';
import Link from 'next/link';
import React from 'react';
import { ConsultExampleTag } from './ConsultExampleTag';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { ConsultExampleFirstAnswerTime } from './ConsultExampleFirstAnswerTime';
import { useConsultExample } from '@/hooks/api/consultExample/useConsultExample';
import { dateFormat } from '@/libs/date';

type Props = {
  consultExample: ConsultExampleEntity;
};

export const ConsultExampleListItem: React.FC<Props> = ({
  consultExample,
}: Props) => {
  const { getMedicalSpecialityName } = useMedicalSpeciality();
  const { getAgeText, getGenderText } = useConsultExample();

  return (
    <Link href={`/example/${consultExample.example_id}`}>
      <a>
        <div className="text-sm hover:opacity-60">
          <div
            className={`flex ${
              consultExample.first_answer_minutes > 0
                ? 'items-start'
                : 'items-center'
            } justify-between gap-2 lg:items-center`}
          >
            <div className="flex gap-2">
              <div>
                <ConsultExampleTag>
                  {consultExample.speciality_code === ''
                    ? consultExample.category_name
                    : getMedicalSpecialityName(
                        consultExample.speciality_code
                      ) || ''}
                </ConsultExampleTag>
              </div>
            </div>
            <div
              className="
                flex
                flex-1
                flex-col
                items-end
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >
              {consultExample.first_answer_minutes > 0 ? (
                <div className="mb-4 lg:mb-0">
                  <ConsultExampleFirstAnswerTime
                    firstAnswerMinutes={consultExample.first_answer_minutes}
                  />
                </div>
              ) : (
                <div></div>
              )}
              <div className="flex items-center">
                <img
                  src="/icons/good_out.svg"
                  width="24"
                  height="24"
                  alt="いいねの数"
                />
                <div className="ml-1">{consultExample.all_like_count}</div>
                <img
                  src="/icons/comment.svg"
                  width="24"
                  height="24"
                  className="ml-4 block"
                  alt="コメントの数"
                />
                <div className="ml-1">{consultExample.all_comment_count}</div>
              </div>
            </div>
          </div>
          <div className="mt-2 font-bold line-clamp-1 lg:mt-3">
            {consultExample.title}
          </div>
          <div className="mt-4 flex justify-between lg:mt-3">
            <div>
              {consultExample.age !== null && (
                <>
                  <span>{getAgeText(consultExample.age)}</span>{' '}
                </>
              )}
              <span>
                {getGenderText(consultExample.gender, consultExample.age)}
              </span>{' '}
              <span>{consultExample.disease_name}</span>
            </div>
            <div>
              事例公開日：
              {dateFormat(consultExample.published_date, 'YYYY/M/D')}
            </div>
          </div>
          <div className="mt-4 text-[#999999]">{consultExample.background}</div>
        </div>
      </a>
    </Link>
  );
};