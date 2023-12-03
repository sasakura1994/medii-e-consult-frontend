import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { useLogin } from '@/hooks/useLogin';
import Link from 'next/link';
import { TextField } from '@/components/Parts/Form/TextField';
import GoogleLoginButton from '@/components/Button/GoogleLoginButton';
import { AppleSignInButton } from '@/components/Button/AppleSignInButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { CustomHead } from '@/components/Layouts/Header/CustomHead';
import { LayoutLogoOnly } from '@/components/Layouts/LayoutLogoOnly';

const GuideLink = ({
  children,
  href,
  onClick,
}: {
  children: string;
  href: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}) => {
  return (
    <Link href={href} className="text-base text-secondary" onClick={onClick}>
      {children}
    </Link>
  );
};

const Login: NextPageWithLayout = () => {
  const { setEmail, setPassword, login, errorMessage, nmoLoginUrl, mailAddressRef, goToRegistration, saveRedirectUrl } =
    useLogin();

  return (
    <div className="min-h-[93vh] w-full bg-bg pt-6 lg:pt-10">
      <div
        className="
          mx-auto
          flex
          max-w-[345px]
          flex-col
          items-center
          rounded-lg
          border
          border-solid
          border-login-container-frame
          bg-white
          pb-8
          lg:max-w-login-container
          lg:pt-4
        "
      >
        <h1 className="my-6 text-center text-2xl">E-コンサルにログイン</h1>
        <form onSubmit={login} className="flex w-[311px] flex-col items-center lg:w-[394px]">
          <TextField
            ref={mailAddressRef}
            placeholder="メールアドレス"
            type="email"
            required
            name="mail_address"
            className="h-[40px] text-[15px]"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            placeholder="パスワード"
            type="password"
            required
            name="password"
            className="mt-4 h-[40px] text-[15px]"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="mt-4 w-full text-right hover:underline">
            <GuideLink href="/PasswordResetRequest" onClick={saveRedirectUrl}>
              パスワードをお忘れの方
            </GuideLink>
          </div>
          <div>
            <PrimaryButton
              size="large"
              type="submit"
              className="
                mb-6
                mt-4
                h-[56px]
                w-[311px] 
                px-14
                py-2
                text-base
                font-semibold
                lg:w-[394px]
              "
            >
              ログイン
            </PrimaryButton>
          </div>
          {errorMessage != '' && <p className="text-center font-bold text-red-500">{errorMessage}</p>}
        </form>
        <div className="w-[311px] text-center lg:w-[400px]">
          <div className="mb-3 flex w-full items-center justify-center gap-x-4">
            <p className="h-0 w-[50px] border-t lg:w-[93px]"></p>
            <p className="text-secondary">その他の方法でログイン</p>
            <p className="h-0 w-[50px] border-t lg:w-[93px]"></p>
          </div>
          <a href={nmoLoginUrl}>
            <div
              className="
                mb-3
                flex
                h-[72px]
                flex-col
                items-center
                gap-2
                rounded
                border
                border-border-field
                px-4
                pb-1
                pt-3
                text-base
                font-semibold
                text-text-caption
                hover:bg-monotone-200
              "
            >
              <img src="images/alliance/logo-nmo-sp.png" alt="" width="100" />
              <div>日経メディカルアカウントでログイン</div>
            </div>
          </a>
          <div>
            <GoogleLoginButton />
          </div>
          <div className="mb-6 mt-[68px]" onMouseDown={saveRedirectUrl}>
            <AppleSignInButton>Appleでログイン</AppleSignInButton>
          </div>
        </div>
        <div className="w-full border-t border-border-divider" />
        <form onSubmit={login}>
          <div className="mt-6 hover:underline">
            <GuideLink
              href="/registration"
              onClick={(e) => {
                e.preventDefault();
                goToRegistration();
              }}
            >
              新規登録はこちら
            </GuideLink>
          </div>
        </form>
      </div>
      <footer className="fixed bottom-0 w-full bg-bg-primary pb-[13px] pt-1 text-center text-xs">
        @Medii, Inc. All Right Reserved
      </footer>
    </div>
  );
};

Login.getLayout = (page: React.ReactElement) => (
  <>
    <CustomHead />
    <LayoutLogoOnly>{page}</LayoutLogoOnly>
  </>
);

export default Login;
