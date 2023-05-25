import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { ConsultExampleDetailEntity } from '@/types/entities/ConsultExampleDetailEntity';
import { mutate } from 'swr';

const generatePath = (id: string, consultExampleMessageId?: number) =>
  `/ConsultExampleComment/comments?consult_example_id=${id}${
    consultExampleMessageId
      ? `&consult_example_message_id=${consultExampleMessageId}`
      : ''
  }`;

export const mutateFetchConsultExampleComments = (
  id: string,
  consultExampleMessageId?: number
) => mutate(generatePath(id, consultExampleMessageId));

export const useFetchConsultExampleComments = (
  id: string,
  consultExampleMessageId?: number
) => {
  return useAuthenticatedSWR<ConsultExampleDetailEntity>(
    generatePath(id, consultExampleMessageId)
  );
};
