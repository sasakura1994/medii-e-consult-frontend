import React, { useState } from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Query = {
  fromwelcome?: string;
};

export const OnboardingQuestionaryModal = () => {
  const router = useRouter();
  const { fromwelcome } = router.query as Query;
  const [isClosed, setIsClosed] = useState(false);

  if (!fromwelcome || isClosed) {
    return <></>;
  }

  return (
    <Modal
      className="flex min-w-0 justify-center border-none bg-transparent"
      isCenter
      setShowModal={() => setIsClosed(true)}
      dataTestId="onboarding-questionary-modal"
    >
      <Link href="/onboarding/questionary">
        <a>
          <img src="/images/onboarding/questionary_modal.png" alt="100Mediiポイントもらえるアンケートに答える" />
        </a>
      </Link>
    </Modal>
  );
};
