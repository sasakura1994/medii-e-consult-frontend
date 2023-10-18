import React from 'react';
import { UserConsult } from './UserConsult';
import { TopNotifications } from './TopNotifications';
import { TopNews } from './TopNews';
import { TopMediiMagazine } from './TopMediiMagazine';
import { TopNewerConsults } from './TopNewerConsults';
import { TopExamples } from './TopExamples';
import TutorialExplanation from './TutorialExplanation';
import { useTop } from './useTop';
import { TopUpcomingSeminars } from './TopUpcomingSeminars';
import { useFetchFlag } from '@/hooks/api/account/useFetchFlags';
import Link from 'next/link';

export const Top = () => {
  const { showTutorialExplanationModal, setShowTutorialExplanationModal } = useTop();
  const { flag: isOnboardingQuestionaryAnswered } = useFetchFlag('OnboardingAnswered');

  return (
    <div className="bg-white">
      <div className="mx-4 flex min-h-screen flex-col pb-12 pt-6 lg:mx-10 lg:flex-row lg:justify-center">
        <div className="max-w-[1024px] pb-8 lg:w-0 lg:flex-grow">
          <TopNotifications />
          <UserConsult setShowTutorialExplanationModal={setShowTutorialExplanationModal} />
          <TopExamples />
          <div className="mt-10">
            <TopUpcomingSeminars />
          </div>
        </div>
        <div className="mt-2 lg:mx-4 lg:ml-10 lg:mt-0 lg:w-[296px]">
          <TopNewerConsults />
          {isOnboardingQuestionaryAnswered === false && (
            <div className="my-6" data-testid="onboarding-questionary-banner">
              <Link href="/onboarding/questionary">
                <img
                  src="images/onboarding/questionary_banner.png"
                  alt="アンケートに答えて100Mediiポイント進呈"
                  className="w-full"
                />
              </Link>
            </div>
          )}
          <div className="mt-4">
            <TopNews />
          </div>
          <div className="mt-4 hidden lg:block">
            <TopMediiMagazine />
          </div>
        </div>
      </div>
      {showTutorialExplanationModal && <TutorialExplanation setShowModal={setShowTutorialExplanationModal} />}
    </div>
  );
};
