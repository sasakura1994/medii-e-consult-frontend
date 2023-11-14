import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { ConsultExampleMessageEntity } from '@/types/entities/ConsultExampleMessageEntity';
import { mutate } from 'swr';

const generatePath = (consultExampleId: string) => `/ConsultExample/message_list?example_id=${consultExampleId}`;

export const mutateFetchConsultExampleMessages = (consultExampleId: string) => mutate(generatePath(consultExampleId));

export const useFetchConsultExampleMessages = (consultExampleId?: string) => {
  return useAuthenticatedSWR<ConsultExampleMessageEntity[]>(consultExampleId ? generatePath(consultExampleId) : null);
};
