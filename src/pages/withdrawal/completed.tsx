import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { HeaderLogoOnly } from '@/components/Layouts/Header/HeaderLogoOnly';

const WithdrawCompletedPage: NextPageWithLayout = () => {
  return (
    <div className="bg-bg-primary flex h-[100vh] flex-col">
      <HeaderLogoOnly />
      <div className="mx-auto mt-8 max-w-[1024px] px-4 pb-20 text-center lg:px-0">
        <h2 className="text-xxl font-semibold">アカウント削除が完了しました</h2>
        <p className="mt-2 text-md">
          ご利用ありがとうございました。
          <br />
          またのご利用を心よりお待ちしております。
        </p>
      </div>
    </div>
  );
};

WithdrawCompletedPage.getLayout = (page: React.ReactElement) => {
  return page;
};

export default WithdrawCompletedPage;
