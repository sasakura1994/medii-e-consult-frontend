import SecondaryButton from '@/components/Button/SecondaryButton';
import React from 'react';
import { StyledHiddenScrollBar } from './styled';
import { UserConsult } from './UserConsult';
import { TopItem } from './TopItem';
import { TopNotifications } from './TopNotifications';
import { TopNews } from './TopNews';
import { TopInterviews } from './TopInterviews';
import { TopNewerConsults } from './TopNewerConsults';

export const Top = () => {
  return (
    <div className="mx-4 flex min-h-screen flex-col pb-12 pt-6 lg:mx-10 lg:flex-row lg:pb-0">
      <div className="lg:flex-grow">
        <TopNotifications />
        <UserConsult />
        <StyledHiddenScrollBar className="mt-10 flex items-center">
          <p className="flex-grow text-xxl font-bold text-text-primary">
            E-コンサル事例集
          </p>
          <SecondaryButton size="large">
            解決済みのコンサル事例を見る
          </SecondaryButton>
        </StyledHiddenScrollBar>
        <StyledHiddenScrollBar className="flex space-x-2 overflow-x-auto py-4">
          <TopItem />
          <TopItem />
          <TopItem />
        </StyledHiddenScrollBar>
        <p className="text-md text-text-secondary">
          ※ 掲載を許諾されたE-コンサルを掲載しています。
        </p>
      </div>
      <div className="mt-2 lg:mx-4 lg:mt-0 lg:ml-10 lg:w-[296px]">
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
