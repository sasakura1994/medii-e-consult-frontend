import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { PublicLayout } from '@/components/Layouts/PublicLayout';
import { Card } from '@/components/Parts/Card/Card';
import { TextField } from '@/components/Parts/Form/TextField';
import { usePasswordReset } from '@/features/password/usePasswordReset';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';

const PasswordResetPage: NextPageWithLayout = () => {
  const {
    firstPassword,
    isPasswordNotMatched,
    isTokenExists,
    secondPassword,
    setFirstPassword,
    setSecondPassword,
  } = usePasswordReset();

  return (
    <>
      <Card className="p-4">
        <h1 className="text-center text-2xl">Medii パスワードリセット</h1>
        <div className="mt-4 flex  justify-center">
          <div>
            <div className="font-bold">パスワード</div>
            <div className="mt-1">
              <TextField
                type="password"
                name="first_password"
                value={firstPassword}
                onChange={(e) => setFirstPassword(e.target.value)}
              />
            </div>
            <div className="mt-4 font-bold">パスワード(確認)</div>
            <div className="mt-1">
              <TextField
                type="password"
                name="second_password"
                value={secondPassword}
                onChange={(e) => setSecondPassword(e.target.value)}
              />
            </div>
            {isPasswordNotMatched && (
              <div className="text-center">パスワードが一致していません</div>
            )}
            <div className="my-6 text-center">
              <button type="button">パスワード設定</button>
            </div>
          </div>
        </div>
        {!isTokenExists && (
          <ErrorMessage>トークンが指定されていません</ErrorMessage>
        )}
      </Card>
    </>
  );
};

PasswordResetPage.getLayout = (page: React.ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default PasswordResetPage;
