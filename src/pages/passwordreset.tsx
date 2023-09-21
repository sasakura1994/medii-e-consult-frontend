import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { PublicLayout } from '@/components/Layouts/PublicLayout';
import { Card } from '@/components/Parts/Card/Card';
import { TextField } from '@/components/Parts/Form/TextField';
import { usePasswordReset } from '@/features/password/passwordReset/usePasswordReset';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import Link from 'next/link';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';

const PasswordResetPage: NextPageWithLayout = () => {
  const {
    firstPassword,
    isCompleted,
    isPasswordNotMatched,
    errorMessage,
    isSending,
    isTokenExists,
    onSubmit,
    secondPassword,
    setFirstPassword,
    setSecondPassword,
  } = usePasswordReset();

  return (
    <>
      <Card className="p-4">
        {!isCompleted ? (
          <>
            <h1 className="text-center text-2xl">Medii パスワードリセット</h1>
            <form onSubmit={onSubmit}>
              <div className="mt-4 flex  justify-center">
                <div className="mx-auto w-52">
                  <div className="font-bold">パスワード</div>
                  <div className="mt-1">
                    <TextField
                      type="password"
                      name="first_password"
                      ariaLabel="first_password"
                      value={firstPassword}
                      onChange={(e) => setFirstPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mt-4 font-bold">パスワード(確認)</div>
                  <div className="mt-1">
                    <TextField
                      type="password"
                      name="second_password"
                      ariaLabel="second_password"
                      value={secondPassword}
                      onChange={(e) => setSecondPassword(e.target.value)}
                      required
                    />
                  </div>
                  {isPasswordNotMatched && <div className="text-center">パスワードが一致していません</div>}
                  <div className="my-6 text-center">
                    {!isSending ? (
                      <PrimaryButton type="submit" className="mx-auto">
                        パスワード設定
                      </PrimaryButton>
                    ) : (
                      <div className="mt-4 text-center">
                        <SpinnerBorder />
                      </div>
                    )}
                    {errorMessage !== '' && <ErrorMessage className="mt-4 text-center">{errorMessage}</ErrorMessage>}
                  </div>
                </div>
              </div>
            </form>
            {!isTokenExists && <ErrorMessage className="text-center">トークンが指定されていません</ErrorMessage>}
          </>
        ) : (
          <div className="text-center" data-testid="result-text">
            パスワードリセットが完了しました。
            <br />
            <Link href="/login" data-label="backToLoginLink">
              ログインはこちらから
            </Link>
          </div>
        )}
      </Card>
    </>
  );
};

PasswordResetPage.getLayout = (page: React.ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default PasswordResetPage;
