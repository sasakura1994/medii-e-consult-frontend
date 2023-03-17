import React from 'react';
import Link from 'next/link';

export const HeaderLogo: React.FC = () => {
  return (
    <div className="-mt-1 h-[27px] w-[100.28px]">
      <Link href="/">
        <a className="inline-block no-underline">
          <img
            src="/images/side_logo.svg"
            alt="Medii E-コンサル"
            className="h-full w-full"
          />
        </a>
      </Link>
    </div>
  );
};
