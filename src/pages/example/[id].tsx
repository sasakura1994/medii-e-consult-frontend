import React from 'react';
import type { NextPage } from 'next';
import { Container } from '@/components/Layouts/Container';
import { useRouter } from 'next/router';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { useConsultExamplePage } from '@/features/consultExample/useConsultExamplePage';
import { ConsultExampleDetail } from '@/features/consultExample/ConsultExampleDetail';

type Query = {
  id: string;
};

const ConsultExamplePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as Query;
  const { consultExample, consultExampleMessages } = useConsultExamplePage(id);
  useEventLog({ name: `/example/${id}` });

  return (
    <Container className="py-6">
      {consultExample && consultExampleMessages && (
        <ConsultExampleDetail
          consultExample={consultExample}
          consultExampleMessages={consultExampleMessages}
        />
      )}
    </Container>
  );
};

export default ConsultExamplePage;
