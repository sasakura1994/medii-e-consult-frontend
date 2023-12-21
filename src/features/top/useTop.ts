import { useProfile } from '@/hooks/useProfile';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { useRouter } from 'next/router';
import { useState } from 'react';

type UseTop = {
  showTutorialExplanationModal: boolean;
  setShowTutorialExplanationModal: (value: boolean) => void;
  profile?: ProfileEntity;
};

export const useTop = (): UseTop => {
  const router = useRouter();
  const query = router.query;
  const [showTutorialExplanationModal, setShowTutorialExplanationModal] = useState(query.tutorial === 'true');
  const { profile } = useProfile();
  return {
    showTutorialExplanationModal,
    setShowTutorialExplanationModal,
    profile,
  };
};
