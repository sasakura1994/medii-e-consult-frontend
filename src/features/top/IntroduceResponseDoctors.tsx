import React from 'react';
import { StyledHiddenScrollBar } from './styled';
import { IntroduceResponseDoctor } from './IntroduceResponseDoctor';

export const IntroduceResponseDoctors = () => {
  return (
    <>
      <div className="mt-10 flex items-center mb-3">
        <p className="flex-grow text-xl font-bold text-text-primary lg:text-xxl">回答いただける先生のご紹介</p>
      </div>
      <p className="text-md text-text-primary mb-3">
        E-コンサルでは1,000人以上のエキスパート専門医に診断・治療方針を相談できます。
      </p>
      <StyledHiddenScrollBar className="flex max-w-[1024px] space-x-2 overflow-x-auto px-1 py-4">
        <IntroduceResponseDoctor />
      </StyledHiddenScrollBar>
    </>
  );
};
