import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { Container } from '@/components/Layouts/Container';
import { Card } from '@/components/Parts/Card/Card';
import { ConsultExampleListSeparator } from '@/features/consultExample/ConsultExampleListSeparator';
import { useFetchConsultExamples } from '@/hooks/api/consultExample/useFetchConsultExamples';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ConsultExampleTag } from '@/features/consultExample/ConsultExampleTag';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { ConsultExampleFirstAnswerTime } from '@/features/consultExample/ConsultExampleFirstAnswerTime';
import { dateFormat } from '@/libs/date';
import { useConsultExample } from '@/hooks/api/consultExample/useConsultExample';
import { Pagination } from '@/components/Parts/Pagination/Pagination';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';

type Query = {
  page?: string;
};

const ConsultExamplesPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query as Query;
  const { data } = useFetchConsultExamples(page ? Number(page) : undefined);
  const { getMedicalSpecialityName } = useMedicalSpeciality();
  const { getAgeText, getGenderText } = useConsultExample();
  useEventLog({ name: '/ExampleList' });

  return (
    <Container>
      <Card className="px-5 py-10 lg:mt-10 lg:pl-[90px] lg:pr-[80px]">
        <h2 className="mb-10 text-center text-2xl">コンサル事例集</h2>
        {data && (
          <>
            <ConsultExampleListSeparator className="hidden lg:block" />
            {data.list.map((consultExample) => (
              <div key={consultExample.example_id}>
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
                                firstAnswerMinutes={
                                  consultExample.first_answer_minutes
                                }
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
                            <div className="ml-1">
                              {consultExample.all_like_count}
                            </div>
                            <img
                              src="/icons/comment.svg"
                              width="24"
                              height="24"
                              className="ml-4 block"
                              alt="コメントの数"
                            />
                            <div className="ml-1">
                              {consultExample.all_comment_count}
                            </div>
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
                            {getGenderText(
                              consultExample.gender,
                              consultExample.age
                            )}
                          </span>{' '}
                          <span>{consultExample.disease_name}</span>
                        </div>
                        <div>
                          事例公開日：
                          {dateFormat(
                            consultExample.published_date,
                            'YYYY/M/D'
                          )}
                        </div>
                      </div>
                      <div className="mt-4 text-[#999999]">
                        {consultExample.background}
                      </div>
                    </div>
                  </a>
                </Link>
                <ConsultExampleListSeparator />
              </div>
            ))}
            <div className="mt-4">
              <Pagination
                page={page ? Number(page) : 1}
                maxPage={data.max_page}
                url="/ExampleList"
              />
            </div>
          </>
        )}
      </Card>
    </Container>
  );
};

export default ConsultExamplesPage;
