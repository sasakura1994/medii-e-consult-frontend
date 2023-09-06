import { useAxios } from '@/hooks/network/useAxios';
import { useCallback } from 'react';

export type PostQuestionaryItemsForOnboardingAnswer = {
  question_id: string;
  choice_ids: number[];
  other_text: string;
};

type RequestData = {
  answers: PostQuestionaryItemsForOnboardingAnswer[];
};

export const usePostQuestionaryItemsForOnboarding = () => {
  const { axios } = useAxios();

  const postQuestionaryItemsForOnboarding = useCallback(
    async (answers: PostQuestionaryItemsForOnboardingAnswer[]) => {
      const data: RequestData = { answers };

      return axios.post('/questionary/servey-answers-onboading', data);
    },
    [axios]
  );

  return { postQuestionaryItemsForOnboarding };
};
