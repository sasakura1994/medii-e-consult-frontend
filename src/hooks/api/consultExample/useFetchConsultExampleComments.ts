import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { ConsultExampleCommentEntity } from '@/types/entities/ConsultExampleCommentEntity';
import { mutate } from 'swr';

type ResponseData = {
  comments: ConsultExampleCommentEntity[];
};

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
  return useAuthenticatedSWR<ResponseData>(
    generatePath(id, consultExampleMessageId)
  );
};
