import React from 'react';
import { useSeminar } from '@/features/seminar/useSeminar';
import { SeminarCard } from '@/features/seminar/seminarCard';
import { Modal } from '@/components/Parts/Modal/Modal';
import { SeminarArchiveHeader } from '@/features/seminar/seminarArchiveHeader';
import Link from 'next/link';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { SeminarConferenceCard } from '@/features/seminar/SeminarConferenceCard';
import SecondaryButton from '@/components/Button/Secondary';
import { NextPageWithLayout } from '../_app';

const Seminar: NextPageWithLayout = () => {
  const { seminars, ticketCount } = useSeminar();
  const [showModal, setShowModal] = React.useState(false);
  useEventLog({ name: '/seminar' });
  if (seminars) {
    return (
      <div
        className="-mt-10 -mb-20 bg-[url('/images/seminar/SP_back.png')] bg-cover
     bg-no-repeat lg:bg-[url('/images/seminar/PC_back.png')]"
      >
        <div className="flex w-full flex-col items-center justify-center py-4 pt-10">
          <div className="mb-8 h-auto rounded-lg bg-white pl-6 pt-6 shadow-low lg:max-w-[976px]">
            <p className="text-xxxl font-bold text-medii-blue-base">
              最新のセミナー
            </p>
            <div className="flex flex-col flex-wrap justify-start lg:flex-row">
              {seminars.map((seminar, index) => {
                if (index < 3) {
                  return (
                    <div key={seminar.seminar_id}>
                      <SeminarConferenceCard index={index} seminar={seminar} />
                    </div>
                  );
                }
              })}
            </div>

            <div className="mx-auto my-6 w-44">
              <Link href={'/seminar/archives'}>
                <SecondaryButton size="large">
                  過去のセミナー動画へ
                </SecondaryButton>
              </Link>
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
              <h3 className="text-center text-2xl text-primary">
                チケットとは?
              </h3>
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
  }
  return <></>;
};

export default Seminar;
