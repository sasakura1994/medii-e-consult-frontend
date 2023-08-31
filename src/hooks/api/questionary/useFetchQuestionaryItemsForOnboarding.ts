import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';

type QuestionaryType = 'SingleChoice' | 'MultiChoice';

export type Question = {
  id: string;
  text: string;
  items: { id: number; text: string }[];
  type: QuestionaryType;
  other_enable: boolean;
  required: boolean;
};

type ResponseData = {
  questions: Question[];
};

const endpoint = '/questionary/onboarding-questions';

export const useFetchQuestionaryItemsForOnboarding = () => {
  const { isLoading, error, data } = useAuthenticatedSWR<ResponseData>(endpoint);

  return {
    isLoading,
    error,
    questions: data?.questions,
  };
};
