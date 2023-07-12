import { useState } from 'react';

type UseTop = {
  showTutorialExplanationModal: boolean;
  setShowTutorialExplanationModal: (value: boolean) => void;
};

export const useTop = (): UseTop => {
  const [showTutorialExplanationModal, setShowTutorialExplanationModal] =
    useState(false);
  return {
    showTutorialExplanationModal,
    setShowTutorialExplanationModal,
  };
};
