import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { ConsultExampleMessageEntity } from '@/types/entities/ConsultExampleMessageEntity';

export const useFetchConsultExampleMessages = (consultExampleId?: string) => {
  return useAuthenticatedSWR<ConsultExampleMessageEntity[]>(
    consultExampleId
      ? `/ConsultExample/message_list?example_id=${consultExampleId}`
      : null
  );
};
