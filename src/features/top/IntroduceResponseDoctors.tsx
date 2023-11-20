import React from 'react';
import { StyledHiddenScrollBar } from './styled';
import { IntroduceResponseDoctor } from './IntroduceResponseDoctor';

export const IntroduceResponseDoctors = () => {
  return (
    <>
      <div className="mb-3 mt-10 flex items-center">
        <p className="flex-grow text-xl font-semibold lg:text-xxl">回答いただける先生のご紹介</p>
      </div>
      <p className="mb-3 text-sm font-light">
        E-コンサルでは1,000人以上のエキスパート専門医に診断・治療方針を相談できます。
      </p>
      <StyledHiddenScrollBar className="overflow-x-auto">
        <IntroduceResponseDoctor />
      </StyledHiddenScrollBar>
    </>
  );
};
