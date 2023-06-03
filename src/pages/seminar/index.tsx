import React from 'react';
import type { NextPage } from 'next';
import { useSeminar } from '@/features/seminar/useSeminar';
import { SeminarCard } from '@/features/seminar/seminarCard';
import { Modal } from '@/components/Parts/Modal/Modal';
import { SeminarArchiveHeader } from '@/features/seminar/seminarArchiveHeader';
import Link from 'next/link';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { SeminarFirstConferenceCard } from '@/features/seminar/SeminarFirstConferenceCard';
import { SeminarConferenceCard } from '@/features/seminar/SeminarConferenceCard';
import SecondaryButton from '@/components/Button/Secondary';

const Seminar: NextPage = () => {
  const { seminars, ticketCount } = useSeminar();
  const [showModal, setShowModal] = React.useState(false);
  useEventLog({ name: '/seminar' });

  return (
    <div
      className="-mt-10 -mb-20 bg-[url('/images/seminar/SP_back.png')] bg-cover
     bg-no-repeat lg:bg-[url('/images/seminar/PC_back.png')]"
    >
      <div className="m-auto flex w-full flex-col items-center py-4 pt-10 lg:w-[960px]">
        <div className="mb-8 flex h-auto flex-col rounded-lg bg-white px-4 shadow-low lg:max-w-[960px] lg:pt-6">
          <p className="text-xxxl font-bold text-medii-blue-base">
            最新のセミナー
          </p>

          {seminars && <SeminarFirstConferenceCard seminar={seminars[0]} />}
          <div className="flex flex-col space-x-4 lg:flex-row">
            {seminars &&
              seminars.map((seminar, index) => {
                if (index === 1 || index === 2) {
                  return (
                    <div key={seminar.seminar_id}>
                      <SeminarConferenceCard seminar={seminar} />
                    </div>
                  );
                }
              })}
          </div>

          <div className="mx-auto my-6 w-44">
            <SecondaryButton size="large">過去のセミナー動画へ</SecondaryButton>
          </div>
        </div>

        <div
          className="flex w-full flex-col items-center rounded-lg px-7 pb-20
         lg:mt-4 lg:max-w-[960px] lg:bg-white lg:px-20 lg:pt-10 lg:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
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
              alt=""
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
              alt=""
            />
            <img
              className="md:hidden"
              src="/images/seminar/about_ticket_sp.png"
              alt=""
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Seminar;
