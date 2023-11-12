import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

type LikeRequestData = {
  example_id: string;
  example_message_id?: number;
};

type LikeCommentArgs = {
  consultExampleId: string;
  consultExampleMessageId?: number;
  consultExampleCommentId: string;
};

type LikeCommentRequestData = {
  example_id: string;
  example_message_id?: number;
  example_comment_id: string;
};

export const useConsultExampleActionsApi = () => {
  const { axios } = useAxios();

  const like = useCallback(
    (id: string) => {
      const data: LikeRequestData = {
        example_id: id,
      };
      return axios.post('/ConsultExampleLike/like', data);
    },
    [axios]
  );

  const unlike = useCallback(
    (id: string) => {
      return axios.delete(`/ConsultExampleLike/unlike?example_id=${id}`);
    },
    [axios]
  );

  const likeMessage = useCallback(
    (id: string, consultExampleMessageId: number) => {
      const data: LikeRequestData = {
        example_id: id,
        example_message_id: consultExampleMessageId,
      };
      return axios.post('/ConsultExampleLike/like', data);
    },
    [axios]
  );

  const unlikeMessage = useCallback(
    (id: string, consultExampleMessageId: number) => {
      return axios.delete(`/ConsultExampleLike/unlike?example_id=${id}&example_message_id=${consultExampleMessageId}`);
    },
    [axios]
  );

  const likeComment = useCallback(
    (args: LikeCommentArgs) => {
      const data: LikeCommentRequestData = {
        example_id: args.consultExampleId,
        example_message_id: args.consultExampleMessageId,
        example_comment_id: args.consultExampleCommentId,
      };
      return axios.post('/ConsultExampleLike/like_to_comment', data);
    },
    [axios]
  );

  const unlikeComment = useCallback(
    (args: LikeCommentArgs) => {
      return axios.delete(
        '/ConsultExampleLike/unlike' +
          `?example_id=${args.consultExampleId}` +
          `&example_message_id=${args.consultExampleMessageId ?? ''}` +
          `&example_comment_id=${args.consultExampleCommentId}`
      );
    },
    [axios]
  );

  return {
    like,
    likeMessage,
    unlike,
    unlikeMessage,
    likeComment,
    unlikeComment,
  };
};
