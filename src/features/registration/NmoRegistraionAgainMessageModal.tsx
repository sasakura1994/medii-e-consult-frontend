import TertiaryButton from '@/components/Button/TertiaryButton';
import { Modal } from '@/components/Parts/Modal/Modal';
import React, { useState } from 'react';

export const NmoRegistrationAgainMessageModal = () => {
  const [isShown, setIsShown] = useState(true);

  if (!isShown) {
    return <></>;
  }

  return (
    <Modal
      closeButton={<TertiaryButton onClick={() => setIsShown(false)}>閉じる</TertiaryButton>}
      className="px-6 pt-6"
      isUseFooter
    >
      <p data-testid="nmo-registration-again-message-modal">
        いつもご利用いただきありがとうございます。
        <br />
        この度ご使用いただいた日経メディカルオンラインのアカウントは、Mediiから退会済となっております。
        <br />
        つきまして、ご利用を再開いただける際には、本ページからMedii会員登録をお願いいたします。
        <br />
        ご不便をおかけし申し訳ございませんが、何卒よろしくお願いいたします。
      </p>
    </Modal>
  );
};
