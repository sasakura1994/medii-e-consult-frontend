import React from 'react';
import { StyledHiddenScrollBar } from './styled';
import { TopNewerConsult } from './TopNewerConsult';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { useFetchNewerConsults } from '@/hooks/api/chat/useFetchNewerConsults';
import Link from 'next/link';

export const TopNewerConsults = () => {
  const consults = useFetchNewerConsults();

  return (
    <>
      <div className="flex justify-center">
        <img src="images/top/top-popup.png" alt="" />
      </div>
      <div className="mt-2 rounded-lg bg-bg-secondary p-4">
        <p className="text-xxl font-bold text-text-primary">新着のE-コンサル</p>
        <StyledHiddenScrollBar className="flex space-x-2 overflow-x-scroll px-1 py-4">
          {consults?.map((consult, index) => (
            <TopNewerConsult key={consult.consult_name + index} consult={consult} />
          ))}
        </StyledHiddenScrollBar>
        <div className="flex justify-center">
          <Link href="/examplelist">
            <a>
              <SecondaryButton size="large" className="w-full">
                解決済みのコンサル事例を見る
              </SecondaryButton>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};
