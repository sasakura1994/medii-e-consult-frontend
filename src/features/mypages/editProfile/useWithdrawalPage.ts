import { removeAuthToken } from '@/libs/cookie';
import { useAxios } from '@/hooks/network/useAxios';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useFetchQuestionaryItemsForWithdrawal } from '@/hooks/api/questionary/useFetchQuestionaryItemsForWithdrawal';

export const useWithdrawalPage = () => {
  const router = useRouter();
  const { axios } = useAxios();
  const [isSending, setIsSending] = useState(false);
  const [selectedQuestionaryItemIds, setSelectedQuestionaryItemIds] = useState<number[]>([]);

  const { questionaryItems } = useFetchQuestionaryItemsForWithdrawal();

  const toggleQuestionaryItem = useCallback((questionaryItemId: number) => {
    setSelectedQuestionaryItemIds((selectedQuestionaryItemIds) => {
      if (selectedQuestionaryItemIds.includes(questionaryItemId)) {
        return selectedQuestionaryItemIds.filter(
          (currentQuestionaryItemId) => questionaryItemId !== currentQuestionaryItemId
        );
      } else {
        return [...selectedQuestionaryItemIds, questionaryItemId];
      }
    });
  }, []);

  const withdraw = useCallback(async () => {
    setIsSending(true);

    const response = await axios.delete('/doctor/withdraw').catch((error) => {
      console.error(error);
      alert(error.response.data.message || 'エラーが発生しました');
      return null;
    });

    setIsSending(false);

    if (!response) {
      return;
    }

    removeAuthToken();
    router.push('/withdrawal/completed');
  }, [axios, router]);

  return { isSending, questionaryItems, selectedQuestionaryItemIds, toggleQuestionaryItem, withdraw };
};
