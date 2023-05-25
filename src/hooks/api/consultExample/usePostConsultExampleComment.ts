import { useAxios } from '@/hooks/network/useAxios';
import { ConsultExampleCommentEntity } from '@/types/entities/ConsultExampleCommentEntity';
import { useCallback } from 'react';

type PostConsultExampleCommentArgs = {
  isAnonymous: boolean;
  body: string;
  consultExampleId: string;
  consultExampleMessageId?: string;
};

type PostConsultExampleCommentRequestData = {
  is_anonymous: number;
  body: string;
  example_id: string;
  example_message_id?: string;
};

type PostConsultExampleCommentResponseData = {
  comment: ConsultExampleCommentEntity;
};

export const usePostConsultExampleComment = () => {
  const { axios } = useAxios();

  const postConsultExampleComment = useCallback(
    (args: PostConsultExampleCommentArgs) => {
      const data: PostConsultExampleCommentRequestData = {
        is_anonymous: args.isAnonymous ? 1 : 0,
        body: args.body,
        example_id: args.consultExampleId,
        example_message_id: args.consultExampleMessageId,
      };
      return axios.post<PostConsultExampleCommentResponseData>(
        '/ConsultExampleComment/store',
        data
      );
    },
    [axios]
  );

  return { postConsultExampleComment };
};
