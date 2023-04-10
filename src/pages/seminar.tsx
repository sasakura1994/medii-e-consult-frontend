import React from 'react';
import type { NextPage } from 'next';
import { useSeminar } from '@/features/seminar/useSeminar';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import { SeminarCard } from '@/features/seminar/seminarCard';
import { Modal } from '@/components/Parts/Modal/Modal';
import { OutlinedSquareButton } from '@/components/Parts/Button/OutlinedSquareButton';

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
const Login: NextPage = () => {
  const { seminars, latestSeminar, ticketCount } = useSeminar();
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className="pb-12 bg-[url('/images/seminar/SP_back.png')] bg-cover bg-no-repeat md:bg-[url('/images/seminar/PC_back.png')]">
      <div className="m-auto flex max-w-[960px] flex-col items-center py-4 pt-10">
        <h2 className="h-32  w-72 bg-contain bg-no-repeat px-12 pt-0 text-center text-lg text-[#6c6c6c] md:bg-[url('/images/seminar/heading_fukidashi.svg')] md:pt-6 md:text-3xl">
          最新セミナー
        </h2>
        <div className="mt-30 relative w-full bg-white pt-24 pb-20  md:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] md:mt-64 md:w-[960px] md:rounded-lg md:pt-40">
          <div className="absolute top-[-100px] flex w-full justify-center px-6  md:top-[-264px]">
            <img
              src={latestSeminar?.image_url}
              className="aspect-video max-h-[405px] w-full max-w-none drop-shadow-[0_4px_4px_rgba(0,0,0,.25)] md:w-[719px] md:shadow-[20px_27px_0_0_rgb(221,221,221)] md:drop-shadow-none"
            />
          </div>
          <div className="flex flex-col items-center bg-white px-8 md:px-32">
            <a className="w-full">
              <button className="relative mb-2 mt-6 w-full rounded-lg bg-primary py-3 text-lg font-bold text-white md:py-4 md:px-14 md:text-2xl">
                ZOOMセミナーへ
                <img
                  src="/images/seminar/main_button_arrow.svg"
                  className="absolute right-4 top-3 ml-2 inline h-6 md:static md:h-auto"
                />
              </button>
            </a>
            <a href="/seminar#archive">
              <button className="mt-2 mb-4 rounded-lg border border-[#7acadc] bg-[#f2f9ff] py-4 px-14 text-primary md:py-5">
                過去のセミナー動画はこちら
              </button>
            </a>
            <div className="flex w-full flex-col items-center">
              <div className="flex w-full items-center justify-center rounded-md bg-[#e2e7ff] py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary md:h-20 md:w-20">
                  <img
                    src="/images/seminar/video.svg"
                    className="w-[19px] md:w-auto"
                  />
                </div>
                <p className="pl-4 font-bold text-primary md:text-xl">
                  {latestSeminar?.subject}
                </p>
              </div>
            </div>
            <div className="w-full  text-lg">
              <div className="flex-reverse flex flex-col flex-col-reverse items-center justify-between border-b py-4 md:flex-row">
                <div className="w-full md:w-auto">
                  <p>
                    <span className="pr-4 text-2xl text-primary md:text-lg">
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
                    <OutlinedSquareButton className="mb-2 flex items-center rounded-lg border-inherit py-2 px-8 font-bold">
                      <img src="/images/seminar/google_calendar.png" />
                      <div>Googleカレンダーに登録</div>
                    </OutlinedSquareButton>
                  </a>
                </div>
              </div>
              <div className="border-b py-4">
                <div>
                  <p>
                    <span className="pr-4 text-2xl text-primary md:text-lg md:font-bold">
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
                  <p>
                    <span className="pr-4 text-2xl text-primary md:text-lg">
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
          className="mt-10 flex w-full flex-col items-center rounded-lg px-8 pb-20 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] md:max-w-[960px] md:bg-white md:px-20 md:pt-20"
        >
          <h2 className="h-32 max-w-[460px] bg-contain bg-no-repeat md:px-14 pt-6 text-center text-lg text-[#6c6c6c] md:bg-[url('/images/seminar/list_fukidashi.svg')] md:text-3xl">
            セミナーアーカイブ動画
          </h2>
          <div className="mb-6 flex flex-col items-center justify-center md:flex-row">
            <div>
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 bottom-0 rounded-3xl border border-[#c4c4c4] bg-white blur-xs"></div>
                <div className="relative flex items-center p-6">
                  <img src="/images/seminar/ticket.png" />
                  <p className="pl-2 md:text-2xl">
                    現在のチケット所持枚数
                    <span className="pl-2 text-4xl font-bold text-[#f5847d]">
                      {ticketCount?.ticket_count}
                      <span className="text-lg">枚</span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="text-xm mt-4 w-full rounded-md bg-primary py-4 px-4 text-white md:ml-10 md:mt-0 md:w-auto"
            >
              チ ケットを獲得するには?
            </button>
          </div>
          <div>
            <div className="grid grid-cols-[1fr] gap-4 md:grid-cols-[1fr_1fr]">
              {seminars?.slice(0, 2).map((seminar) => (
                <SeminarCard seminar={seminar} key={seminar.seminar_id} />
              ))}
            </div>
          </div>
          <a
            href="/seminar/archives"
            className="my-10 inline-flex items-center rounded-full border border-primary px-6 py-3 text-sm text-primary"
          >
            すべてのアーカイブ動画を見る
            <img src="/icons/arrow_right.svg" className="ml-2 inline h-3 " />
          </a>
          <p className="text-sm">
            ※アーカイブ動画に表示している医師の方々の経歴などの情報は、セミナー当時のものとなっております。
          </p>
        </div>
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <div className="align-center relative flex flex-col bg-white px-6 py-4 md:py-20 md:px-28">
            <img
              onClick={() => setShowModal(false)}
              src="/icons/close_primary.svg"
              className="absolute right-4 top-4 md:right-10 md:top-14"
            />
            <h3 className="text-center text-2xl text-primary">チケットとは?</h3>
            <p className="py-10">
              チケットとはセミナー動画アーカイブを閲覧するために必要なものです。
              <br />
              E-コンサルで相談するとセミナーチケット1枚獲得できます。
            </p>
            <img src="/images/seminar/about_ticket_pc.png" />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Login;
