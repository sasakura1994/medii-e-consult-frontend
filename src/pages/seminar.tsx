import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { AiFillApple } from 'react-icons/ai';
import { useLogin } from '@/hooks/useLogin';
import { useRouter } from 'next/router';
import AppleSignin from 'react-apple-signin-auth';
import Link from 'next/link';
import { useSeminar } from '@/features/seminar/useSeminar';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import { SeminarCard } from '@/features/seminar/seminarCard';
import { useProfile } from '@/features/mypages/editProfile/useProfile';

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

const getSeminarDateTime = ( seminar: SeminarEntityType ) =>
{
  if (!seminar) return '';
  const [year, month, day] = seminar.seminar_date
    .substring(0, 10)
    .split(/-/) as string[];
  const seminarDate = new Date(seminar.seminar_date);
  const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][
    seminarDate.getDay() as number
  ];
  return (
    `${Number(year)}年${Number(month)}月${Number(day)}日(${dayOfWeek}) ` +
    seminar.seminar_start_time.substring(0, 5) +
    '-' +
    seminar.seminar_end_time.substring(0, 5)
  );
};

const googleCalendarUrl = ( seminar: SeminarEntityType ) =>
{
  if (!seminar) return '';
  const date = seminar.seminar_date.substring(0, 11);
  const start = encodeURIComponent(
    (date + seminar.seminar_start_time).replace(/[-:]/g, '')
  );
  const end = encodeURIComponent(
    (date + seminar.seminar_end_time).replace(/[-:]/g, '')
  );
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    seminar.subject
  )}&dates=${start}/${end}&details=${encodeURIComponent(
    seminar.description
  )}&location=${encodeURIComponent(seminar.zoom_url)}`;
};
const Login: NextPage = () =>
{
  const { profile } = useProfile();
  const { seminars, latestSeminar, ticketCount } = useSeminar();
  console.log( latestSeminar );
  const router = useRouter();
  useEffect( () =>
  {
    if ( !profile )
    {
      router.push('/login')
    }
  }, [profile])
  return (
    <div className="bg-covermb-12 bg-[url('/images/seminar/SP_back.png')] md:bg-[url('/images/seminar/PC_back.png')]">
      <div className="m-auto flex w-[960px] flex-col items-center py-4 pt-10">
        <h2 className="h-24  w-60 bg-[url('/images/seminar/heading_fukidashi.svg')] bg-contain bg-no-repeat px-6 pt-4 text-3xl text-[#6c6c6c]">
          最新セミナー
        </h2>
        <div className="relative mt-64 w-[960px] rounded-lg  bg-white pt-40 pb-20 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
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
