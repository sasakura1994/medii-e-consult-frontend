import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { useLogin } from '@/hooks/useLogin';
import Link from 'next/link';
import { TextField } from '@/components/Parts/Form/TextField';
import { PublicLayout } from '@/components/Layouts/PublicLayout';
import GoogleLoginButton from '@/components/Button/GoogleLoginButton';
import { AppleSignInButton } from '@/components/Button/AppleSignInButton';
import PrimaryButton from '@/components/Button/PrimaryButton';

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
    <div className="mb-12 md:mt-6">
      <div
        className="
          mx-auto
          flex
          max-w-login-container
          flex-col
          items-center
          border
          border-solid
          border-login-container-frame
          bg-white
          pb-8
          pt-4
        "
      >
        <h1 className="my-8 text-center text-2xl">E-コンサルにログイン</h1>
        <form onSubmit={login} className="flex w-[394px] flex-col items-center">
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
          <div className="mt-4 w-full text-right">
            <GuideLink href="/PasswordResetRequest" onClick={saveRedirectUrl}>
              パスワードをお忘れの方
            </GuideLink>
          </div>
          <div>
            <PrimaryButton
              size="large"
              type="submit"
              className="
                mt-4
                mb-6
                text-base
                font-semibold
                rounded-full
                px-14
                py-2
                w-[394px]
                h-[56px]
                drop-shadow-[0_4px_10px_rgba(92,107,192,.3)]
              "
            >
              ログイン
            </PrimaryButton>
          </div>
          {errorMessage != '' && <p className="text-center font-bold text-red-500">{errorMessage}</p>}
        </form>
        <div className="text-center w-[400px]">
          <div className='flex w-full gap-x-4 items-center justify-center mb-3'>
            <p className='border w-[93px] h-0'></p>
            <p className='text-secondary'>その他の方法でログイン</p>
            <p className='border w-[93px] h-0'></p>
          </div>
          <a href={nmoLoginUrl}>
            <div
              className="
                flex
                flex-col
                items-center
                gap-2
                rounded
                border
                border-border-field
                px-4
                pb-1
                pt-2
                mb-3
                hover:bg-monotone-200
                text-text-caption
                text-base
                font-semibold
              "
            >
              <img src="images/alliance/logo-nmo-sp.png" alt="" width="100" />
              <div>日経メディカルアカウントでログイン</div>
            </div>
          </a>
          <div>
            <GoogleLoginButton />
          </div>
          <div className="mt-[68px] mb-6" onMouseDown={saveRedirectUrl}>
            <AppleSignInButton>Appleでログイン</AppleSignInButton>
          </div>
        </div>
        <div className='border border-border-divider w-full'></div>
        <form onSubmit={login}>
          <div className="mt-6">
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
    </div>
  );
};

Login.getLayout = (page: React.ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Login;
