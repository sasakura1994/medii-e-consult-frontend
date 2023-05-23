import { useConsultExampleActions } from '@/hooks/api/consultExample/useConsultExampleActions';
import { useFetchConsultExample } from '@/hooks/api/consultExample/useFetchConsultExample';
import { useFetchConsultExampleMessages } from '@/hooks/api/consultExample/useFetchConsultExampleMessages';
import { useCallback } from 'react';

export const useConsultExamplePage = (id: string) => {
  const { data: consultExample, mutate: mutateConsultExample } =
    useFetchConsultExample(id);
  const { data: consultExampleMessages } = useFetchConsultExampleMessages(id);
  const { like, unlike } = useConsultExampleActions();

  const likeAndMutate = useCallback(async () => {
    await like(id);
    mutateConsultExample();
  }, [id, like, mutateConsultExample]);

  const unlikeAndMutate = useCallback(async () => {
    await unlike(id);
    mutateConsultExample();
  }, [id, unlike, mutateConsultExample]);

  return {
    consultExample,
    consultExampleMessages,
    likeAndMutate,
    unlikeAndMutate,
  };
};
