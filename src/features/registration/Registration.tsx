import React from 'react';
import Link from 'next/link';
import { UseRegisterType } from '@/hooks/useRegister';
import { TextField } from '@/components/Parts/Form/TextField';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';
import { Footer } from '@/components/Layouts/Footer/Footer';
import { Required } from '@/components/Parts/Form/Required';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { HeaderContainer } from '@/components/Layouts/Header/HeaderContainer';
import { HeaderLogo } from '@/components/Layouts/Header/HeaderLogo';
import { HeaderMenuList } from '@/components/Layouts/Header/HeaderMenuList';
import TertiaryButton from '@/components/Button/TertiaryButton';
import { AppleSignInButton } from '@/components/Button/AppleSignInButton';

export const Registration = (props: UseRegisterType) => {
  const { email, setEmail, register, loginUrl, isEmailDuplicated, errorMessage } = props;

  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-[#eff3f6]">
      <HeaderContainer>
        <div className="flex w-full items-center justify-between">
          <HeaderLogo href={loginUrl} />
          <HeaderMenuList>
            <Link href={loginUrl}>
              <a>
                <TertiaryButton size="large">ログイン</TertiaryButton>
              </a>
            </Link>
          </HeaderMenuList>
        </div>
      </HeaderContainer>
      <main className="flex-grow bg-[url('/images/registration/bg.png')] bg-cover md:py-10">
        <div className="mx-auto flex justify-center md:py-4">
          <div
            className="
                  flex flex-col items-stretch justify-center
                  md:flex-row md:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] lg:mb-8
                "
          >
            <img src="images/registration/left.png" className="hidden max-w-[480px] bg-white md:block" alt="" />
            <img src="images/registration/mobile_main.png" className="bg-white md:hidden lg:max-w-[480px]" alt="" />
            <div
              className="
                flex max-w-[480px] flex-col items-center justify-items-stretch bg-white
                px-4 pb-6 pt-6 md:pb-4 lg:px-6 lg:pt-8
                "
            >
              <h1 className="text-center text-2xl">新規会員登録</h1>
              <div className="mt-4 text-sm font-light lg:text-[16px]">※医師・医学生専用のサービスです</div>
              <p className="mt-2 text-sm font-light">
                E-コンサルに会員登録すると、
                <a
                  href="https://e-consult.medii.jp/doc/terms_of_usage.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  利用規約
                </a>
                と
                <Link href="/privacypolicy">
                  <a className="underline">プライバシーポリシー</a>
                </Link>
                に同意したものとみなされます。
              </p>
              <form
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  register();
                }}
              >
                <div className="mt-6 flex items-center gap-2">
                  <label className="font-semibold">メールアドレス</label>
                  <Required>必須</Required>
                </div>
                <TextField
                  name="email"
                  placeholder="メールアドレス"
                  type="email"
                  className="mt-2"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                {errorMessage != '' && <ErrorMessage className="mt-6 text-center">{errorMessage}</ErrorMessage>}
                {isEmailDuplicated && (
                  <ErrorMessage className="text-center">
                    <Link href="/passwordresetrequest">
                      <span className="underline">こちら</span>
                    </Link>
                    よりパスワードの設定をお願いします。
                  </ErrorMessage>
                )}
                <div className="mt-4 flex justify-center">
                  <PrimaryButton
                    size="large"
                    type="submit"
                    className="w-full px-4 lg:w-auto"
                    disabled={email.trim() === ''}
                  >
                    同意して登録
                  </PrimaryButton>
                </div>
              </form>
              <div className="mt-6 font-light text-text-secondary">または</div>

              <div className="mt-6">
                <AppleSignInButton borderColorClassName="border-[#DADFE5]">Appleアカウントで登録する</AppleSignInButton>
              </div>
              <hr className="mt-6 w-full border-[1px] border-border-divider" />
              <div className="mt-6 flex items-center justify-center gap-4 text-md text-text-secondary">
                <Link href={loginUrl}>
                  <a className="underline">ログイン</a>
                </Link>
                <div>/</div>
                <a
                  // eslint-disable-next-line max-len
                  href="https://tayori.com/faq/4cb3c7c0fd09ab493d1efcbf01dcf76729c62202/category/fea2bb08831c952f089f3f8a91b98f72c6ec300b/"
                  className="underline"
                  target="_blank"
                  rel="noreferrer nofollow"
                >
                  登録にお困りの方
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
