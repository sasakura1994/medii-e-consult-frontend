import React from 'react';
import { NextPageWithLayout } from '../_app';
import { Seminar } from '@/features/seminar';
import { OnboardingQuestionaryModal } from '@/features/onboarding/OnboardingQuestionaryModal';

const SeminarPage: NextPageWithLayout = () => {
  return (
    <>
      <Seminar />
      <OnboardingQuestionaryModal />
    </>
  );
};

export default SeminarPage;
