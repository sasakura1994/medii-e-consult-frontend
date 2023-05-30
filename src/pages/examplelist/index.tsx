import React from 'react';
import type { NextPage } from 'next';
import { Container } from '@/components/Layouts/Container';
import { Card } from '@/components/Parts/Card/Card';
import { ConsultExampleListSeparator } from '@/features/consultExample/ConsultExampleListSeparator';
import { useFetchConsultExamples } from '@/hooks/api/consultExample/useFetchConsultExamples';
import { useRouter } from 'next/router';
import { Pagination } from '@/components/Parts/Pagination/Pagination';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { ConsultExampleListItem } from '@/features/consultExample/ConsultExampleListItem';

type Query = {
  page?: string;
};

const ConsultExamplesPage: NextPage = () => {
  const router = useRouter();
  const { page } = router.query as Query;
  const { data } = useFetchConsultExamples(page ? Number(page) : undefined);
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
                <ConsultExampleListItem consultExample={consultExample} />
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
