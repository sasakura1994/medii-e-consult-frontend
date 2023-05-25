import { useState } from 'react';

export const useConsultExampleCommentModal = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [body, setBody] = useState('');

  return { body, isAnonymous, setBody, setIsAnonymous };
};
