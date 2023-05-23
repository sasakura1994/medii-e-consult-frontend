import React from 'react';
import type { NextPage } from 'next';
import { useSeminar } from '@/features/seminar/useSeminar';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import { SeminarCard } from '@/features/seminar/seminarCard';
import { Modal } from '@/components/Parts/Modal/Modal';
import { OutlinedSquareButton } from '@/components/Parts/Button/OutlinedSquareButton';
import { SeminarArchiveHeader } from '@/features/seminar/seminarArchiveHeader';
import Link from 'next/link';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';

const getSeminarDateTime = (seminar: SeminarEntityType) => {
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

const googleCalendarUrl = (seminar: SeminarEntityType) => {
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

const Seminar: NextPage = () => {
  const { seminars, latestSeminar, ticketCount } = useSeminar();
  const [showModal, setShowModal] = React.useState(false);
  useEventLog({ name: '/seminar' });

  return (
    <div className="bg-[url('/images/seminar/SP_back.png')] bg-cover bg-no-repeat pb-12 lg:bg-[url('/images/seminar/PC_back.png')]">
      <div className="m-auto flex max-w-[960px] flex-col items-center py-4 pt-10">
        <h2
          className="h-32  w-72 bg-contain bg-no-repeat px-12 pt-0 text-center text-lg text-[#6c6c6c]
        lg:bg-[url('/images/seminar/heading_fukidashi.svg')] lg:pt-6 lg:text-3xl"
        >
          最新セミナー
        </h2>
        <div className="mt-30 relative w-full bg-white pb-20 pt-24  lg:mt-64 lg:w-[960px] lg:rounded-lg lg:pt-40 lg:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
          <div className="absolute top-[-100px] flex w-full justify-center px-6  lg:top-[-264px]">
            <img
              src={latestSeminar && latestSeminar.image_url}
              className="aspect-video max-h-[405px] w-full max-w-none drop-shadow-[0_4px_4px_rgba(0,0,0,.25)] lg:w-[719px] lg:shadow-[20px_27px_0_0_rgb(221,221,221)] lg:drop-shadow-none"
            />
          </div>
          <div className="flex flex-col items-center bg-white px-8 lg:px-32">
            <a className="w-full lg:w-auto">
              <button className="relative mb-2 mt-6 w-full rounded-lg bg-primary py-3 text-base font-bold text-white lg:w-auto lg:px-12 lg:py-4 lg:text-2xl">
                ZOOMセミナーへ
                <img
                  src="/images/seminar/main_button_arrow.svg"
                  className="absolute right-4 top-3 ml-2 inline h-6 lg:static  lg:ml-6"
                />
              </button>
            </a>
            <Link href="/seminar#archive">
              <button className="mb-4 mt-2 rounded-lg border border-[#7acadc] bg-[#f2f9ff] px-14 py-4 text-primary lg:py-5">
                過去のセミナー動画はこちら
              </button>
            </Link>
            <div className="flex w-full flex-col items-center">
              <div className="flex w-full items-center justify-center rounded-md bg-[#e2e7ff] py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary lg:h-20 lg:w-20">
                  <img
                    src="/images/seminar/video.svg"
                    className="w-[19px] lg:w-auto"
                  />
                </div>
                <p className="pl-4 font-bold text-primary lg:text-xl">
                  {latestSeminar?.subject}
                </p>
              </div>
            </div>
            <div className="w-full  text-lg">
              <div className="flex-reverse flex flex-col flex-col-reverse items-center justify-between border-b py-4 lg:flex-row">
                <div className="w-full lg:w-auto">
                  <p className="text-base lg:text-lg">
                    <span className="pr-4 text-2xl text-primary lg:text-lg">
                      日時
                    </span>
                    {latestSeminar !== undefined
                      ? getSeminarDateTime(latestSeminar)
                      : ''}
                  </p>
                </div>
                <div>
                  <a
                    href={
                      latestSeminar !== undefined
                        ? googleCalendarUrl(latestSeminar)
                        : ''
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <OutlinedSquareButton className="mb-2 flex items-center rounded-lg border-inherit px-8 py-2 font-bold">
                      <img src="/images/seminar/google_calendar.png" />
                      <p className="ml-4">Googleカレンダーに登録</p>
                    </OutlinedSquareButton>
                  </a>
                </div>
              </div>
              <div className="border-b py-4">
                <div>
                  <p className="text-base lg:text-lg">
                    <span className="pr-4 text-2xl text-primary lg:text-lg lg:font-bold">
                      講師
                    </span>{' '}
                    {latestSeminar?.doctor_name !== undefined
                      ? latestSeminar.doctor_name
                      : ''}
                    先生
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <div>
                  <p className="text-base lg:text-lg">
                    <span className="pr-4 text-2xl text-primary lg:text-lg">
                      セミナー概要
                    </span>
                    <br />
                    {latestSeminar?.description !== undefined
                      ? latestSeminar.description
                      : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="archive"
          className="flex w-full flex-col items-center rounded-lg px-7 pb-20 lg:mt-10 lg:max-w-[960px] lg:bg-white lg:px-20 lg:pt-20 lg:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
        >
          <SeminarArchiveHeader ticketCount={ticketCount} />
          <div>
            <div className="grid grid-cols-[1fr] gap-4 lg:grid-cols-[1fr_1fr]">
              {seminars?.slice(0, 2).map((seminar) => (
                <SeminarCard seminar={seminar} key={seminar.seminar_id} />
              ))}
            </div>
          </div>
          <Link href="/seminar/archives">
            <a className="my-6 inline-block lg:my-10">
              <div
                className="inline-flex items-center rounded-full border
               border-primary bg-white px-8 py-2 text-[11px] text-primary
             lg:px-6 lg:py-3 lg:text-sm"
              >
                すべてのアーカイブ動画を見る
                <img
                  src="/icons/arrow_right.svg"
                  className="ml-2 inline h-3"
                  alt=""
                />
              </div>
            </a>
          </Link>
          <p className="text-center text-sm">
            ※アーカイブ動画に表示している医師の方々の経歴などの情報は、セミナー当時のものとなっております。
          </p>
        </div>
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal} className="lg:w-[800px]">
          <div className="align-center relative flex flex-col items-center bg-white px-6 py-4 lg:px-28 lg:py-20">
            <img
              onClick={() => setShowModal(false)}
              src="/icons/close_primary.svg"
              className="absolute right-4 top-4 lg:right-10 lg:top-14"
            />
            <h3 className="text-center text-2xl text-primary">チケットとは?</h3>
            <p className="py-10">
              チケットとはセミナー動画アーカイブを閲覧するために必要なものです。
              <br />
              E-コンサルで相談するとセミナーチケット1枚獲得できます。
            </p>
            <img
              className="hidden md:block"
              src="/images/seminar/about_ticket_pc.png"
            />
            <img
              className="md:hidden"
              src="/images/seminar/about_ticket_sp.png"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Seminar;
