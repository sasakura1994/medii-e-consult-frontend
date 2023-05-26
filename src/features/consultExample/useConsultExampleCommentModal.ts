import { useCallback, useState } from 'react';
import { useConsultExampleActions } from './useConsultExampleActions';

export const useConsultExampleCommentModal = (consultExampleId: string) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [body, setBody] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const { createCommentAndMutate, isCommentSending } =
    useConsultExampleActions(consultExampleId);

  const createComment = useCallback(async () => {
    setIsCompleted(false);

    const result = await createCommentAndMutate({ isAnonymous, body }).catch(
      (error) => {
        console.error(error);
        return null;
      }
    );

    if (!result) {
      return;
    }

    setIsCompleted(true);
    setBody('');
  }, [body, createCommentAndMutate, isAnonymous]);

  return {
    body,
    createComment,
    isAnonymous,
    isCommentSending,
    isCompleted,
    setBody,
    setIsAnonymous,
  };
};
