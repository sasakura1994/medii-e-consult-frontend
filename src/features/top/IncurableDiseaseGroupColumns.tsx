import React from 'react';
import { StyledHiddenScrollBar } from './styled';
import { IncurableDiseaseGroupColumn } from './IncurableDiseaseGroupColumn';

export const IncurableDiseaseGroupColumns = () => {
  return (
    <>
      <div className="mb-3 mt-10 flex items-center">
        <p className="flex-grow text-xl font-semibold lg:text-xxl">特定の症例を専門医グループで相談</p>
      </div>
      <p className="mb-4 hidden text-sm font-light lg:flex">
        専門医グループには希少疾患・難病に対しても回答可能な医師が参加してます。
      </p>
      <StyledHiddenScrollBar className="overflow-x-auto">
        <IncurableDiseaseGroupColumn />
      </StyledHiddenScrollBar>
    </>
  );
};
