import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type PostQuestionaryAnswersRequestData = {
  answer_ids: number[];
  question_type: string;
  room_id: string;
};

export const usePostQuestionaryAnswers = () => {
  const { axios } = useAxios();

  const postQuestionaryAnswers = useCallback(
    async (data: PostQuestionaryAnswersRequestData) => {
      return axios.post('/questionary/answers', data);
    },
    [axios]
  );

  return { postQuestionaryAnswers };
};
