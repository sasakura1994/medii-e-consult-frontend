import SecondaryButton from '@/components/Button/SecondaryButton';
import React from 'react';
import { StyledHiddenScrollBar } from './styled';
import { UserConsult } from './UserConsult';
import { TopNotifications } from './TopNotifications';
import { TopNews } from './TopNews';
import { TopInterviews } from './TopInterviews';
import { TopNewerConsults } from './TopNewerConsults';
import { TopExamples } from './TopExamples';

export const Top = () => {
  return (
    <div className="mx-4 flex min-h-screen flex-col pb-12 pt-6 lg:mx-10 lg:flex-row lg:pb-0">
      <div className="lg:flex-grow">
        <TopNotifications />
        <UserConsult />
        <TopExamples />
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
  );
};
