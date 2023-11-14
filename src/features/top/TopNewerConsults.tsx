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
      <div>
        <div className="bg-popup flex  items-center justify-center gap-[10px] rounded p-2  shadow-low ">
          <img src="icons/top-popup-back.svg" alt="" />
          <p className="text-sm font-light">毎日多くのコンサルがエキスパート医師により解決されています！</p>
        </div>
        <div className="flex px-4">
          <img src="icons/top-popup-arrow.svg" className="drop-shadow-popup" alt="" />
        </div>
      </div>
      <div className="mt-2 rounded-lg bg-bg-secondary p-4">
        <p className="text-xxl font-bold text-text-primary">新着のE-コンサル</p>
        <StyledHiddenScrollBar className="flex space-x-2 overflow-x-scroll px-1 py-4">
          {consults?.map((consult, index) => <TopNewerConsult key={consult.consult_name + index} consult={consult} />)}
        </StyledHiddenScrollBar>
        <div className="flex justify-center">
          <Link href="/examplelist">
            <SecondaryButton size="large" className="w-full">
              解決済みのコンサル事例を見る
            </SecondaryButton>
          </Link>
        </div>
      </div>
    </>
  );
};
