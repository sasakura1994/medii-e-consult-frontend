import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import { BreadcrumbItem } from '@/components/Breadcrumb/BreadcrumbItem';
import { BreadcrumbLink } from '@/components/Breadcrumb/BreadcrumbLink';
import { WithdrawalCard } from '@/features/withdrawal/WithdrawalCard';
import SecondaryButton from '@/components/Button/SecondaryButton';
import Link from 'next/link';
import PrimaryButton from '@/components/Button/PrimaryButton';

const WithdrawalConfirmPage: NextPageWithLayout = () => {
  return (
    <div className="mx-auto mt-8 max-w-[1024px] px-4 pb-20 lg:px-0">
      <Breadcrumb>
        <BreadcrumbLink href="/top">TOP</BreadcrumbLink>
        <BreadcrumbLink href="/editprofile">マイページ</BreadcrumbLink>
        <BreadcrumbItem>アカウント削除</BreadcrumbItem>
      </Breadcrumb>
      <h2 className="mt-2 text-xxl font-semibold">アカウント削除</h2>
      <div className="mt-10 text-md">
        Mediiのアカウントを削除します。削除完了後は、コンサル・E-カンファ・症例バンクの全てのサービスが利用できなくなります。
      </div>
      <div className="mt-3 flex flex-col gap-6 lg:flex-row">
        <WithdrawalCard
          image="images/withdrawal/img_e-consult.png"
          buttonLabel="E-コンサルについて詳しく知る"
          href="https://medii.jp/e-consult"
        />
        <WithdrawalCard
          image="images/withdrawal/img_e-confe.svg"
          buttonLabel="E-カンファについて詳しく知る"
          href="https://medii.jp/e-conference"
        />
      </div>
      <div className="mt-6">
        <h3 className="text-l font-semibold">メール配信を停止したい</h3>
        <div className="mt-1 text-md">通知設定より『Mediiからのお知らせメール』を停止することができます</div>
        <div className="mt-3">
          <Link href="/notifysettings">
            <a>
              <SecondaryButton>通知設定</SecondaryButton>
            </a>
          </Link>
        </div>
        <h3 className="mt-6 text-l font-semibold">お問い合わせ</h3>
        <div className="mt-1 text-md">なにかお困りの際は、Medii医師会員コンシェルジュへお気軽にご相談ください。</div>
        <div className="mt-3">
          <a href="https://tayori.com/form/62897c986d36f5b573fec1a04508f24b70b11fe6" target="_blank" rel="noreferrer">
            <SecondaryButton>問い合わせ</SecondaryButton>
          </a>
        </div>
      </div>
      <div className="mt-10 flex justify-center gap-3">
        <Link href="/editprofile">
          <a>
            <SecondaryButton size="large">戻る</SecondaryButton>
          </a>
        </Link>
        <Link href="/withdrawal">
          <a>
            <PrimaryButton size="large">アカウント削除の手続き</PrimaryButton>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default WithdrawalConfirmPage;
