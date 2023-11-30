import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { QuestionaryItemEntity } from '@/types/entities/QuestionaryItemEntity';

type GetQuestionaryItemsResponseData = {
  items: QuestionaryItemEntity[];
};

const endpoint = '/questionary/transform-items';

export const useFetchQuestionaryItemsForTransform = () => {
  const { data } = useAuthenticatedSWR<GetQuestionaryItemsResponseData>(endpoint);

  return {
    questionaryItems: data?.items,
  };
};
