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

export const Top = () => {
  const { showTutorialExplanationModal, setShowTutorialExplanationModal } = useTop();
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
