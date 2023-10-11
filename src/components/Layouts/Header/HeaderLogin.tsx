import React from 'react';
import Link from 'next/link';

export const HeaderLogin = () => {
  return (
    <div className="-mt-1 h-[27px] w-[100.28px] ml-10 hidden xl:block">
      <Link href="/login">
        <a className="inline-block no-underline">ログイン</a>
      </Link>
    </div>
  );
};
