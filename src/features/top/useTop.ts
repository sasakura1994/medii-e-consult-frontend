import { UseProfile, useProfile } from '@/hooks/useProfile';
import { useRouter } from 'next/router';
import { useState } from 'react';

type UseTop = Pick<UseProfile, 'profile' | 'isOnboardingQuestionaryIsNotNeeded'> & {
  showTutorialExplanationModal: boolean;
  setShowTutorialExplanationModal: (value: boolean) => void;
};

export const useTop = (): UseTop => {
  const router = useRouter();
  const query = router.query;
  const [showTutorialExplanationModal, setShowTutorialExplanationModal] = useState(query.tutorial === 'true');
  const { profile, isOnboardingQuestionaryIsNotNeeded } = useProfile();
  return {
    isOnboardingQuestionaryIsNotNeeded,
    showTutorialExplanationModal,
    setShowTutorialExplanationModal,
    profile,
  };
};
