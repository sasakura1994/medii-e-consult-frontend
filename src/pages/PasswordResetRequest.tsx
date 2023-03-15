import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { PublicLayout } from '@/components/Layouts/PublicLayout';
import { Card } from '@/components/Parts/Card/Card';

const PasswordResetRequestPage: NextPageWithLayout = () => {
  return (
    <>
      <Card
        className="
          p-[16px]
        "
      >
        <h1 className="text-center text-[24px]">Medii パスワードリセット</h1>
        <div className="mt-[16px] flex  justify-center">
          <div>
            <div className="font-bold">メールアドレス</div>
            <div className="mt-[4px]">
              <input />
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
