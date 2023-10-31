import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { useInitPassword } from '@/features/password/initPassword/useInitPassword';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';
import Link from 'next/link';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { Footer } from '@/components/Layouts/Footer/Footer';
import { HeaderLogoOnly } from '@/components/Layouts/Header/HeaderLogoOnly';
import { Required } from '@/components/Parts/Form/Required';
import PrimaryButton from '@/components/Button/PrimaryButton';
import TextField from '@/components/TextField/TextField';

const InitPassword: NextPageWithLayout = () => {
  const {
    errorMessage,
    firstPassword,
    isEmailDuplicated,
    isFirstPasswordValid,
    isPasswordNotMatched,
    isSending,
    isTokenExists,
    isValid,
    onSubmit,
    secondPassword,
    setFirstPassword,
    setSecondPassword,
  } = useInitPassword();

  return (
    <div className="flex h-full min-h-screen w-full flex-col">
      <HeaderLogoOnly />
      <main className="flex flex-grow justify-center px-4 py-10 lg:px-0">
        <div className="w-full lg:w-[400px]">
          <h2 className="text-center text-2xl font-semibold">パスワードの登録</h2>
          <form onSubmit={onSubmit} className="mt-6">
            <div className="flex items-center gap-2">
              <label className="font-semibold">パスワード</label>
              <Required>必須</Required>
            </div>
            <div className="mt-2">
              <TextField
                className="w-full text-md"
                type="password"
                name="first_password"
                dataTestId="first-password"
                value={firstPassword}
                placeholder="パスワードを入力"
                onChange={(e) => setFirstPassword(e.target.value)}
                required
                hasError={!isFirstPasswordValid}
              />
            </div>
            <div className="mt-2 text-medii-sm font-light">
              {isFirstPasswordValid ? (
                <p className="text-text-secondary">8文字以上の半角英数字・記号</p>
              ) : (
                <p className="text-error">8文字以上の半角英数字・記号で入力してください</p>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <label className="font-semibold">パスワード再入力</label>
              <Required>必須</Required>
            </div>
            <div className="mt-1">
              <TextField
                className="w-full text-md"
                type="password"
                name="second_password"
                dataTestId="second-password"
                value={secondPassword}
                placeholder="確認のため、同じパスワードを再入力"
                onChange={(e) => setSecondPassword(e.target.value)}
                required
                hasError={isPasswordNotMatched}
              />
            </div>
            {isPasswordNotMatched && (
              <p className="mt-2 text-medii-sm font-light text-error">
                最初に入力したパスワードと同じ文字を入力してください
              </p>
            )}
            <div className="my-6 flex justify-center">
              {!isSending ? (
                <PrimaryButton type="submit" size="large" className="h-[56px] w-full" disabled={!isValid}>
                  次へ
                </PrimaryButton>
              ) : (
                <div className="mt-4 text-center">
                  <SpinnerBorder />
                </div>
              )}
            </div>
          </form>
          {!isTokenExists && <ErrorMessage className="text-center">トークンが指定されていません</ErrorMessage>}
          {errorMessage !== '' && <ErrorMessage className="text-center">{errorMessage}</ErrorMessage>}
          {isEmailDuplicated && (
            <ErrorMessage className="mt-4 text-center">
              <Link href="/login" className="text-inherit underline" style={{ color: '-webkit-link' }}>
                ログイン画面
              </Link>{' '}
              よりログインし直すか{' '}
              <Link href="/PasswordResetRequest" className="underline" style={{ color: '-webkit-link' }}>
                パスワードの再設定
              </Link>{' '}
              をお願いします。
            </ErrorMessage>
          )}
        </div>
      </main>
      <Footer noMenu />
    </div>
  );
};

InitPassword.getLayout = (page: React.ReactElement) => {
  return page;
};

export default InitPassword;
