import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { AiFillApple } from 'react-icons/ai';
import { useLogin } from '@/hooks/useLogin';
import { useRouter } from 'next/router';
import AppleSignin from 'react-apple-signin-auth';
import Link from 'next/link';
import { useSeminar } from '@/features/seminar/useSeminar';

const TextField = (props: JSX.IntrinsicElements['input']) => {
  return (
    <input
      className="mb-4 h-12 w-80 rounded border border-solid border-text-field-frame p-4"
      {...props}
    />
  );
};

const GuideLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <Link href={href}>
      <a className="text-sm text-guide-link underline">{children}</a>
    </Link>
  );
};
const Login: NextPage = () => {
  const { seminars, latestSeminar, ticketCount } = useSeminar();
  console.log( latestSeminar );
  const router = useRouter();
  return (
    <div className="bg-covermb-12 bg-[url('/images/seminar/SP_back.png')] md:bg-[url('/images/seminar/PC_back.png')]">
      <div className="flex flex-col items-center py-4 pt-10">
        <h2 className="h-24  w-60 bg-[url('/images/seminar/heading_fukidashi.svg')] bg-contain bg-no-repeat px-6 pt-4 text-3xl text-[#6c6c6c]">
          最新セミナー
        </h2>
        <div className="relative mt-64 w-[960px] rounded-lg  bg-white pt-40 pb-20">
          <div className="absolute top-[-264px] flex w-full justify-center">
            <img
              src={latestSeminar?.image_url}
              className="h-[405px] w-[719px] max-w-none"
            />
          </div>
          <div className="flex flex-col items-center bg-white">
            <a>
              <button className="mt-10 mb-2 rounded-full bg-primary py-3 px-10 text-lg font-bold text-white  drop-shadow-[0_4px_10px_rgba(92,107,192,.3)]">
                ZOOMセミナーへ
                <img
                  src="/images/seminar/main_button_arrow.svg"
                  className="ml-2 inline"
                />
              </button>
            </a>
            <a>
              <button className="mt-10 mb-2 rounded-full bg-primary py-3 px-10 text-lg font-bold text-white  drop-shadow-[0_4px_10px_rgba(92,107,192,.3)]">
                過去のセミナー動画はこちら
              </button>
            </a>
            <div className="flex flex-col items-center">
              <div className="bg-[#e2e7ff] flex items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                  <img src="/images/seminar/video.svg" />
                </div>
                <p>{latestSeminar?.subject}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
