import TertiaryButton from '@/components/Button/TertiaryButton';
import Link from 'next/link';
import React from 'react';

type Props = {
  image: string;
  href: string;
  buttonLabel: string;
};

export const WithdrawalCard = (props: Props) => {
  const { image, href, buttonLabel } = props;

  return (
    <div className="flex h-[224px] flex-1 flex-col items-center justify-center gap-4 rounded-lg shadow-high">
      <img src={image} alt="" />
      <a href={href} target="_blank" rel="noreferrer">
        <TertiaryButton size="large" className="flex items-center gap-1">
          <div>{buttonLabel}</div>
          <img src="/icons/box-arrow-up-right.svg" width="16" height="16" alt="" />
        </TertiaryButton>
      </a>
    </div>
  );
};
