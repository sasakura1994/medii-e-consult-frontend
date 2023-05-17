import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { ConsultExampleEntity } from '@/types/entities/ConsultExampleEntity';

export type FetchConsultExamplesResponseData = {
  list: ConsultExampleEntity[];
  count: number;
  limit: number;
};

export const useFetchConsultExamples = (page?: number) => {
  return useAuthenticatedSWR<FetchConsultExamplesResponseData>(
    `ConsultExample/consult_examples?page=${page || 1}`
  );
};
