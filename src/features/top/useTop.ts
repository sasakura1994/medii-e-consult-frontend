import { useRouter } from 'next/router';
import { useState } from 'react';

type UseTop = {
  showTutorialExplanationModal: boolean;
  setShowTutorialExplanationModal: (value: boolean) => void;
};

export const useTop = (): UseTop => {
  const router = useRouter();
  const query = router.query;
  const [showTutorialExplanationModal, setShowTutorialExplanationModal] = useState(query.tutorial === 'true');
  return {
    showTutorialExplanationModal,
    setShowTutorialExplanationModal,
  };
};
