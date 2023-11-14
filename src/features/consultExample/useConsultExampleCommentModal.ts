import { useCallback, useState } from 'react';
import { useConsultExampleActions } from './useConsultExampleActions';

export const useConsultExampleCommentModal = (consultExampleId: string) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [body, setBody] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const { createCommentAndMutate, createCommentForMessageAndMutate, isCommentSending } =
    useConsultExampleActions(consultExampleId);

  const createComment = useCallback(async (): Promise<boolean> => {
    setIsCompleted(false);

    const result = await createCommentAndMutate({ isAnonymous, body }).catch((error) => {
      console.error(error);
      return null;
    });

    if (!result) {
      return false;
    }

    setIsCompleted(true);
    setBody('');
    return true;
  }, [body, createCommentAndMutate, isAnonymous]);

  const createCommentForMessage = useCallback(
    async (consultExampleMessageId: number): Promise<boolean> => {
      setIsCompleted(false);

      const result = await createCommentForMessageAndMutate(consultExampleMessageId, { isAnonymous, body }).catch(
        (error) => {
          console.error(error);
          return null;
        }
      );

      if (!result) {
        return false;
      }

      setIsCompleted(true);
      setBody('');
      return true;
    },
    [body, createCommentForMessageAndMutate, isAnonymous]
  );

  return {
    body,
    createComment,
    createCommentForMessage,
    isAnonymous,
    isCommentSending,
    isCompleted,
    setBody,
    setIsAnonymous,
  };
};
