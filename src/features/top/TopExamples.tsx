import React from 'react';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { StyledHiddenScrollBar } from './styled';
import { TopExample } from './TopExample';
import { useFetchConsultExamples } from '@/hooks/api/consultExample/useFetchConsultExamples';
import Link from 'next/link';

export const TopExamples = () => {
  const { data } = useFetchConsultExamples();

  return (
    <>
      <StyledHiddenScrollBar className="mt-10 flex items-center">
        <p className="flex-grow text-xl font-bold text-text-primary lg:text-xxl">E-コンサル事例集</p>
        <Link href="/examplelist">
          <a>
            <SecondaryButton className="whitespace-nowrap">コンサル事例を見る</SecondaryButton>
          </a>
        </Link>
      </StyledHiddenScrollBar>
      <StyledHiddenScrollBar className="flex max-w-[1024px] space-x-2 overflow-x-auto px-1 py-4">
        {data?.list.map((consultExample) => (
          <TopExample key={consultExample.example_id} consultExample={consultExample} />
        ))}
      </StyledHiddenScrollBar>
      <p className="text-md text-text-secondary">※ 掲載を許諾されたE-コンサルを掲載しています。</p>
    </>
  );
};
