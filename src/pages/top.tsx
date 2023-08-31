import React from 'react';
import { Top } from '@/features/top';
import { NextPageWithLayout } from './_app';
import { OnboardingQuestionaryModal } from '@/features/onboarding/OnboardingQuestionaryModal';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Top />
      <OnboardingQuestionaryModal />
    </>
  );
};

export default Home;
