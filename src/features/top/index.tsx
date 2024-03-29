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
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { IntroduceResponseDoctors } from './IntroduceResponseDoctors';
import { AffiliateBanner } from './AffiliateBanner';
import { IncurableDiseaseGroupColumns } from './IncurableDiseaseGroupColumns';

export const Top = () => {
  const { showTutorialExplanationModal, setShowTutorialExplanationModal, profile, isOnboardingQuestionaryIsNotNeeded } =
    useTop();
  const { flag: isOnboardingQuestionaryAnswered } = useFetchFlag('OnboardingAnswered');
  const { flag: hasConsulted } = useFetchFlag('HasConsulted');
  const { postEventLog } = useEventLog();

  return (
    <div className="bg-white">
      <div className="mx-4 flex min-h-screen flex-col pb-12 pt-6 lg:mx-10 lg:flex-row lg:justify-center">
        <div className="max-w-[1024px] pb-8 lg:w-0 lg:flex-grow">
          <TopNotifications />
          <AffiliateBanner />
          <UserConsult setShowTutorialExplanationModal={setShowTutorialExplanationModal} />
          <IntroduceResponseDoctors />
          <IncurableDiseaseGroupColumns />
          <TopExamples />
          <div className="mt-10">
            <TopUpcomingSeminars />
          </div>
        </div>
        <div className="mt-2 lg:mx-4 lg:ml-10 lg:mt-0 lg:w-[296px]">
          <TopNewerConsults />
          {isOnboardingQuestionaryAnswered === false &&
            !isOnboardingQuestionaryIsNotNeeded &&
            hasConsulted === false &&
            profile &&
            profile.main_speciality !== 'STUDENT' && (
              <div
                className="my-6"
                data-testid="onboarding-questionary-banner"
                onClick={async () => {
                  await postEventLog({ name: 'click-onboarding-questionary' });
                }}
              >
                <Link href="/onboarding/questionary">
                  <img
                    src="images/onboarding/questionary_banner.png"
                    alt="アンケートに答えて500Mediiポイント進呈"
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
