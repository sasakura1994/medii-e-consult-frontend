import React from 'react';
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

type Query = {
  page?: string;
};

const ConsultExamplesPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query as Query;
  const { data } = useFetchConsultExamples(page ? Number(page) : undefined);
  const { getMedicalSpecialityName } = useMedicalSpeciality();

  return (
    <Container>
      <Card className="mt-10 py-10 pl-[90px] pr-[80px]">
        <h2 className="mb-10 text-center text-2xl">コンサル事例集</h2>
        {data && (
          <>
            <ConsultExampleListSeparator />
            {data.list.map((consultExample) => (
              <>
                <Link
                  key={consultExample.example_id}
                  href={`/example/${consultExample.example_id}`}
                >
                  <div>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <ConsultExampleTag>
                          {consultExample.speciality_code === ''
                            ? consultExample.category_name
                            : getMedicalSpecialityName(
                                consultExample.speciality_code
                              ) || ''}
                        </ConsultExampleTag>
                        {consultExample.first_answer_minutes > 0 && (
                          <ConsultExampleFirstAnswerTime
                            firstAnswerMinutes={
                              consultExample.first_answer_minutes
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
                <ConsultExampleListSeparator key={consultExample.example_id} />
              </>
            ))}
          </>
        )}
      </Card>
    </Container>
  );
};

export default ConsultExamplesPage;
