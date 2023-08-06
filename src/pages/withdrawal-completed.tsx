import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { Card } from '@/components/Parts/Card/Card';
import { HeaderLogoOnly } from '@/components/Layouts/Header/HeaderLogoOnly';

const WithdrawCompletedPage: NextPageWithLayout = () => {
  return (
    <div className="flex h-[100vh] flex-col bg-bg">
      <HeaderLogoOnly />
      <div className="flex flex-1 items-center justify-center">
        <Card className="mx-auto w-full px-8 py-20 lg:w-[500px] lg:px-20">
          <div className="text-center">
            <p>
              アカウント削除が完了しました。
              <br />
              またのご利用をお待ちしております。
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

WithdrawCompletedPage.getLayout = (page: React.ReactElement) => {
  return page;
};

export default WithdrawCompletedPage;
