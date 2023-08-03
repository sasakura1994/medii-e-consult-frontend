import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import { BreadcrumbItem } from '@/components/Breadcrumb/BreadcrumbItem';
import { BreadcrumbLink } from '@/components/Breadcrumb/BreadcrumbLink';
import { WithdrawalCard } from '@/features/withdrawal/WithdrawalCard';

const WithdrawalConfirmPage: NextPageWithLayout = () => {
  return (
    <div className="mx-auto mt-8 max-w-[1024px]">
      <Breadcrumb>
        <BreadcrumbLink href="/top">TOP</BreadcrumbLink>
        <BreadcrumbLink href="/editprofile">マイページ</BreadcrumbLink>
        <BreadcrumbItem>アカウント削除</BreadcrumbItem>
      </Breadcrumb>
      <h2 className="mt-2 text-xxl font-semibold">アカウント削除</h2>
      <div className="mt-10 text-md">
        Mediiのアカウントをを削除します。削除完了後は、コンサル・E-カンファ・症例バンクの全てのサービスが利用できなくなります。
      </div>
      <div className="mt-3 flex flex-col gap-6 lg:flex-row">
        <WithdrawalCard
          image="/images/withdrawal/img_e-consult.svg"
          buttonLabel="E-コンサルについて詳しく知る"
          href=""
        />
        <WithdrawalCard image="/images/withdrawal/img_e-confe.svg" buttonLabel="E-カンファについて詳しく知る" href="" />
      </div>
    </div>
  );
};

export default WithdrawalConfirmPage;
