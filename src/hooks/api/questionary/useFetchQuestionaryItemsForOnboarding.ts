import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';

type QuestionaryType = 'SingleChoice' | 'MultiChoice';

type QuestionSection = {
  id: string;
  text: string;
  items: { id: string; text: string }[];
  type: QuestionaryType;
  other_enable: boolean;
  required: boolean;
};

type ResponseData = {
  questions: QuestionSection[];
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
