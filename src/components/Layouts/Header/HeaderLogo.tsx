import React from 'react';
import Link from 'next/link';
type Props = {
  href?: string;
};

export const HeaderLogo = (props: Props) => {
  const { href } = props;
  return (
    <div className="-mt-1 h-[27px] w-[100.28px]">
      <Link href={href ?? '/top'} className="inline-block no-underline">
        <img src="images/side_logo.svg" alt="Medii E-コンサル" className="h-full w-full" />
      </Link>
    </div>
  );
};
