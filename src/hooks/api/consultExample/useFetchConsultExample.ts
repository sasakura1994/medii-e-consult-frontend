import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { ConsultExampleDetailEntity } from '@/types/entities/ConsultExampleDetailEntity';
import { mutate } from 'swr';

const generatePath = (id: string) => `/ConsultExample/example?example_id=${id}`;

export const mutateFetchConsultExample = (id: string) =>
  mutate(generatePath(id));

export const useFetchConsultExample = (id?: string) => {
  return useAuthenticatedSWR<ConsultExampleDetailEntity>(
    id ? generatePath(id) : null
  );
};
