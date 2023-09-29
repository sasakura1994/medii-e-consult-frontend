import React from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import Link from 'next/link';
import { SeminarConferenceCard } from './SeminarConferenceCard';
import { SeminarArchiveHeader } from './SeminarArchiveHeader';
import { SeminarCard } from './SeminarCard';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { useSeminar } from './useSeminar';
import { ImcompleteProfileModal } from '@/components/Parts/Modal/ImcompleteProfileModal';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { AboutTicketModal } from '@/components/Parts/Modal/AboutTicketModal';

export const Seminar = () => {
  const { seminars, upcomingSeminars, ticketCount, showModal, setShowModal } =
    useSeminar();

  if (seminars) {
    return (
      <div
        className="bg-[url('/images/seminar/sp_back.png')] bg-cover
       bg-no-repeat lg:bg-[url('/images/seminar/pc_back.png')]"
      >
        <div className="flex w-full flex-col items-center justify-center py-4 pt-10">
          <div className="mb-8 h-auto rounded-lg bg-white pl-6 pt-6 shadow-low lg:max-w-[976px]">
            <p className="text-xxxl font-bold text-medii-blue-base">
              最新のE-カンファ
            </p>
            <div className="flex flex-col flex-wrap justify-start lg:flex-row">
              {upcomingSeminars &&
                upcomingSeminars.map((seminar, index) => {
                  if (index < 3) {
                    return (
                      <div key={seminar.seminar_id}>
                        <SeminarConferenceCard
                          index={index}
                          seminar={seminar}
                        />
                      </div>
                    );
                  }
                })}
            </div>

            <div className="my-6 flex w-auto justify-center">
              <Link href="/seminar/archives">
                <a>
                  <SecondaryButton size="large">
                    <p>過去のE-カンファ動画へ</p>
                  </SecondaryButton>
                </a>
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
                    src="icons/arrow_right.svg"
                    className="ml-2 inline h-3"
                    alt=""
                  />
                </div>
              </a>
            </Link>
            <p className="text-center text-sm">
              ※アーカイブ動画に表示している医師の方々の経歴などの情報は、E-カンファ当時のものとなっております。
            </p>
          </div>
        </div>

        { showModal && <AboutTicketModal setShowModal={setShowModal} />}
        <ImcompleteProfileModal />
      </div>
    );
  }
  return <></>;
};
