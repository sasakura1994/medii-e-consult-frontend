import React from 'react';
import type { NextPage } from 'next';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import { SeminarCard } from '@/features/seminar/seminarCard';
import { Modal } from '@/components/Parts/Modal/Modal';
import { SeminarArchiveHeader } from '@/features/seminar/seminarArchiveHeader';
import { useRouter } from 'next/router';
import { UseSeminarDetail } from '@/features/seminar/useSeminarDetail';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { SeminarConfirmModal } from '@/components/Parts/Modal/SeminarConfirmModal';

const getSeminarDateTime = (seminar: SeminarEntityType) => {
  if ( !seminar ) return '';
  console.log( seminar );
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

const Seminar: NextPage = () =>
{
  const router = useRouter();
  const { id } = router.query;
  console.log( id );
  const { randomSeminars, seminar, ticketCount, useTicket,
    isTicketConfirmDialogShown,
    isTicketNotEnoughDialogShown,
    setIsTicketConfirmDialogShown,
    setIsTicketNotEnoughDialogShown, } = UseSeminarDetail(id as string);
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className="bg-[url('/images/seminar/SP_back.png')] bg-cover bg-no-repeat pb-12 pt-10 lg:bg-[url('/images/seminar/PC_back.png')]">
      <div className="mx-auto w-full rounded-2xl px-6 pb-20 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] lg:max-w-[960px] lg:bg-white lg:p-10">
        {seminar?.movie_url ? (
          <iframe
            src={seminar.movie_url}
            title="YouTube video player"
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <img
            src={seminar && seminar.image_url}
            className="aspect-video w-full"
          />
        )}
        {!seminar?.movie_url && (
          <div>
            <div>
              <p>チケットを一枚消費して動画を閲覧可能です</p>
            </div>
            <div>
              <p>
                現在のチケット所持枚数 {ticketCount && ticketCount.ticket_count}{' '}
                枚
              </p>
            </div>
            <PrimaryButton onClick={() => setIsTicketConfirmDialogShown(true)}>
              動画を閲覧する
            </PrimaryButton>
          </div>
        )}
        <div className="flex flex-col items-center bg-white px-8 lg:px-[60px]">
          <div className="mt-4 flex w-full flex-col items-center">
            <div className="flex w-full items-center justify-center rounded-md bg-[#e2e7ff] py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary lg:h-20 lg:w-20">
                <img
                  src="/images/seminar/video.svg"
                  className="w-[19px] lg:w-auto"
                />
              </div>
              <p className="pl-4 font-bold text-primary lg:text-xl">
                {seminar && seminar.subject}
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
                  {seminar && getSeminarDateTime(seminar)}
                </p>
              </div>
            </div>
            <div className="border-b py-4">
              <div>
                <p className="text-base lg:text-lg">
                  <span className="pr-4 text-2xl text-primary lg:text-lg lg:font-bold">
                    講師
                  </span>{' '}
                  {seminar?.doctor_name !== undefined
                    ? seminar.doctor_name
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
                  {seminar?.description !== undefined
                    ? seminar.description
                    : ''}
                </p>
              </div>
            </div>
            <a href={`/newChatRoom?target_account_id=${seminar?.account_id}`}>
              <PrimaryButton>この先生にE-コンサルで相談をする</PrimaryButton>
            </a>
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
            {randomSeminars?.slice(0, 2).map((seminar) => (
              <SeminarCard seminar={seminar} key={seminar.seminar_id} />
            ))}
          </div>
        </div>
        <a
          href="/seminar/archives"
          className="my-6 inline-flex items-center rounded-full border border-primary bg-white px-8 py-2 text-[11px] text-primary lg:my-10 lg:px-6 lg:py-3 lg:text-sm"
        >
          すべてのアーカイブ動画を見る
          <img src="/icons/arrow_right.svg" className="ml-2 inline h-3 " />
        </a>
        <p className="text-center text-sm">
          ※アーカイブ動画に表示している医師の方々の経歴などの情報は、セミナー当時のものとなっております。
        </p>
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal} className="lg:w-[800px]">
          <div className="align-center relative flex flex-col items-center bg-white px-6 py-4 lg:py-20 lg:px-28">
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
              className="hidden lg:block"
              src="/images/seminar/about_ticket_pc.png"
            />
            <img
              className="lg:hidden"
              src="/images/seminar/about_ticket_sp.png"
            />
          </div>
        </Modal>
      )}
      {isTicketConfirmDialogShown && (
        <SeminarConfirmModal
          setShowModal={setIsTicketConfirmDialogShown}
          className="lg:w-[800px]"
          title="チケット使用の確認"
          labelText="使用する"
          onSubmit={() => useTicket()}
        >
          <p>アーカイブ動画閲覧にチケット1枚を使用します。</p>
        </SeminarConfirmModal>
      )}
      {isTicketNotEnoughDialogShown && (
        <SeminarConfirmModal
          setShowModal={setIsTicketConfirmDialogShown}
          className="lg:w-[800px]"
          title="チケットが不足しています"
          labelText="E-コンサルへ"
          onSubmit={() => router.push('/newChatRoom')}
        >
          <p className="font-bold">
            アーカイブ動画閲覧にチケット1枚が必要です。
            <br />
            E-コンサルを依頼するとチケットが 1枚獲得できます。
          </p>
        </SeminarConfirmModal>
      )}
    </div>
  );
};

export default Seminar;
