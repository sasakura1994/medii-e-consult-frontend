import { useFetchQuestionaryItemsForOnboarding } from '@/hooks/api/questionary/useFetchQuestionaryItemsForOnboarding';

export const useOnBoardingQuestionary = () => {
  const { questions } = useFetchQuestionaryItemsForOnboarding();

  return { questions };
};
