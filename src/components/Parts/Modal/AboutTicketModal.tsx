import React from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import Link from 'next/link';
import PrimaryButton from '@/components/Button/PrimaryButton';

export type AboutTicketModalPropsType = {
  setShowModal: (isShow: boolean) => void;
};

export const AboutTicketModal: React.FC<AboutTicketModalPropsType> = (props) => {
  const { setShowModal } = props;

    return (
    <Modal setShowModal={setShowModal} className="lg:w-[800px]">
      <div className="align-center relative flex flex-col items-center bg-white px-6 py-4 lg:px-28 lg:py-20">
        <img
          data-testid="close-modal"
          onClick={() => setShowModal(false)}
          src="/icons/close_primary.svg"
          className="absolute right-4 top-4 lg:right-10 lg:top-14"
          alt=""
        />
        <h3 className="text-center text-2xl text-primary">チケットとは?</h3>
        <p className="py-10 pt-10">
          チケットとは、E-カンファアーカイブ動画を閲覧するために必要なものです。
          <br />
          E-コンサルで相談する、もしくはお知り合いの医師にMediiをご紹介いただくとチケットを1枚獲得できます。
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
        <div className="mt-4 flex lg:gap-40">
          <Link href="/newchatroom">
            <a>
              <PrimaryButton size="large">
                <p>コンサル作成</p>
              </PrimaryButton>
            </a>
          </Link>
          <Link href="/affiliate">
            <a>
              <PrimaryButton size="large">
                <p>医師を招待</p>
              </PrimaryButton>
            </a>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
