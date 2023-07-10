import React from 'react';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { StyledHiddenScrollBar } from './styled';
import { TopExample } from './TopExample';
import { useFetchConsultExamples } from '@/hooks/api/consultExample/useFetchConsultExamples';

export const TopExamples = () => {
  const { data } = useFetchConsultExamples();

  return (
    <>
      <StyledHiddenScrollBar className="mt-10 flex items-center">
        <p className="flex-grow text-xxl font-bold text-text-primary">
          E-コンサル事例集
        </p>
        <SecondaryButton size="large">
          解決済みのコンサル事例を見る
        </SecondaryButton>
      </StyledHiddenScrollBar>
      <StyledHiddenScrollBar className="flex max-w-[1024px] space-x-2 overflow-x-auto px-1 py-4">
        {data?.list.map((consultExample) => (
          <TopExample
            key={consultExample.example_id}
            consultExample={consultExample}
          />
        ))}
      </StyledHiddenScrollBar>
      <p className="text-md text-text-secondary">
        ※ 掲載を許諾されたE-コンサルを掲載しています。
      </p>
    </>
  );
};
