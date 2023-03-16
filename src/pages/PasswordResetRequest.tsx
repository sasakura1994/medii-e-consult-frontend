import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { PublicLayout } from '@/components/Layouts/PublicLayout';
import { Card } from '@/components/Parts/Card/Card';

const PasswordResetRequestPage: NextPageWithLayout = () => {
  return (
    <>
      <Card className="p-4">
        <h1 className="text-center text-[24px]">Medii パスワードリセット</h1>
        <div className="mt-4 flex  justify-center">
          <div>
            <div className="font-bold">メールアドレス</div>
            <div className="mt-1">
              <input />
            </div>
            <div className="my-6 text-center">
              <button type="button">送信</button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

PasswordResetRequestPage.getLayout = (page: React.ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default PasswordResetRequestPage;
