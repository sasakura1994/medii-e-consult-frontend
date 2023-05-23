import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { ConsultExampleDetailEntity } from '@/types/entities/ConsultExampleDetailEntity';

export const useFetchConsultExample = (id: string) => {
  return useAuthenticatedSWR<ConsultExampleDetailEntity>(
    `/ConsultExample/example?example_id=${id}`
  );
};
