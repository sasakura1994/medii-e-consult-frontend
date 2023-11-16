import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { ConsultExampleCommentEntity } from '@/types/entities/ConsultExampleCommentEntity';
import { mutate } from 'swr';

type ResponseData = {
  comments: ConsultExampleCommentEntity[];
};

const generatePath = (id: string) => `/ConsultExampleComment/all_comments?consult_example_id=${id}`;

export const mutateFetchConsultExampleAllComments = (id: string) => mutate(generatePath(id));

export const useFetchConsultExampleAllComments = (id: string) => {
  return useAuthenticatedSWR<ResponseData>(generatePath(id));
};
