import { Modal } from '@/components/Parts/Modal/Modal';
import { ticketCountEntity } from '@/types/entities/ticketCountEntity';
import React from 'react';

type Props = {
    ticketCount: ticketCountEntity;
};

export const SeminarArchiveHeader: React.FC<Props> = ( { ticketCount }: Props ) =>
{
  const [showModal, setShowModal] = React.useState(false);
  return (
    <div
      id="archive"
      className="mt-10 flex w-full flex-col items-center rounded-lg px-8 pb-20 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] md:max-w-[960px] md:bg-white md:px-20 md:pt-20"
    >
      <h2 className="h-32 w-[460px] bg-contain bg-no-repeat px-14 pt-6 text-center text-lg text-[#6c6c6c] md:bg-[url('/images/seminar/list_fukidashi.svg')] md:text-3xl">
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
