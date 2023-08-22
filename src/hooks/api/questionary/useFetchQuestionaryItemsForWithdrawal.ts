import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { QuestionaryItemEntity } from '@/types/entities/QuestionaryItemEntity';

type GetQuestionaryItemsResponseData = {
  items: QuestionaryItemEntity[];
};

const endpoint = '/questionary/withdrawal-items';

export const useFetchQuestionaryItemsForWithdrawal = () => {
  const { isLoading, error, data } = useAuthenticatedSWR<GetQuestionaryItemsResponseData>(endpoint);

  return {
    isLoading,
    error,
    questionaryItems: data?.items,
  };
};
