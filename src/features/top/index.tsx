import React from 'react';
import { UserConsult } from './UserConsult';
import { TopNotifications } from './TopNotifications';
import { TopNews } from './TopNews';
import { TopInterviews } from './TopInterviews';
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
  const { flag: isFirstConsultCampaignAvailable } = useFetchFlag('FirstConsultCampaign');

  return (
    <div className="bg-white">
      <div className="mx-4 flex min-h-screen flex-col pb-12 pt-6 lg:mx-10 lg:flex-row lg:justify-center">
        <div className="max-w-[1024px] pb-8 lg:w-0 lg:flex-grow">
          {isFirstConsultCampaignAvailable && (
            <div className="mb-6" data-testid="consult-campaign-banner">
              <Link href="/newchatroom?from=onboarding_banner">
                <a>
                  <img
                    src="/images/onboarding/first_consult_banner.png"
                    alt="はじめてEコンサルで症例を質問した先生に1000円相当のポイントをもれなくプレゼント"
                  />
                </a>
              </Link>
            </div>
          )}
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
                <a>
                  <img src="/images/onboarding/questionary_banner.png" alt="アンケートに答えて100Mediiポイント進呈" />
                </a>
              </Link>
            </div>
          )}
          <div className="mt-4">
            <TopNews />
          </div>
          <div className="mt-4 hidden lg:block">
            <TopInterviews />
          </div>
        </div>
      </div>
      {showTutorialExplanationModal && <TutorialExplanation setShowModal={setShowTutorialExplanationModal} />}
    </div>
  );
};
