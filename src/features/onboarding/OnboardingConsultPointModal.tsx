import React, { useState } from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import Link from 'next/link';
import TertiaryButton from '@/components/Button/TertiaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';

export const OnboardingConsultPointModal = () => {
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) {
    return <></>;
  }

  return (
    <Modal
      className="flex min-w-0 justify-center border-none bg-transparent"
      isCenter
      setShowModal={() => setIsClosed(true)}
      dataTestId="onboarding-questionary-modal"
    >
      <div className="overflow-hidden rounded-lg bg-white">
        <img
          src="/images/onboarding/consult_point_modal.png"
          width="400"
          height="400"
          alt="はじめてEコンサルで質問するともれなく1000円分相当ポイントをプレゼント"
        />
        <div className="flex gap-4 p-4">
          <Link href="/top?tutorial=true">
            <a className="flex-1">
              <TertiaryButton size="large" className="w-full">
                E-コンサルとは
              </TertiaryButton>
            </a>
          </Link>
          <Link href="/newchatroom?from=onboarding_questionary_completed">
            <a className="flex-1">
              <PrimaryButton size="large" className="w-full">
                E-コンサルで質問する
              </PrimaryButton>
            </a>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
