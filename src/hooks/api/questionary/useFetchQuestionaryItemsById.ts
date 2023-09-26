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

export const useFetchQuestionaryItemsById = (id: 'onboarding') => {
  const { isLoading, error, data } = useAuthenticatedSWR<ResponseData>(`/questionary/questions?id=${id}`);

  return {
    isLoading,
    error,
    questions: data?.questions,
  };
};
