import React from 'react';
import Link from 'next/link';
import { Modal } from './Modal';
import PrimaryButton from '@/components/Button/PrimaryButton';

type Props = {
  href: string;
  dataTestId?: string;
};

export const NeedToInputProfileModal = (props: Props) => {
  const { href, dataTestId } = props;

  return (
    <Modal className="w-lg-breakpoint px-8 py-20 lg:px-20">
      <p data-testid={dataTestId}>
        すべてのサービスをご利用いただくには、追加のプロフィール入力が必要です。
        以下のボタンからプロフィールの入力をお願いいたします。
      </p>
      <div className="mt-10">
        <Link href={href}>
          <PrimaryButton size="large" className="mx-auto">
            プロフィール入力
          </PrimaryButton>
        </Link>
      </div>
    </Modal>
  );
};
