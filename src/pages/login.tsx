import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { useLogin } from '@/hooks/useLogin';
import Link from 'next/link';
import { TextField } from '@/components/Parts/Form/TextField';
import { PublicLayout } from '@/components/Layouts/PublicLayout';
import GoogleLoginButton from '@/features/auth/GoogleLoginButton';
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
    <Link href={href} className="text-sm text-guide-link underline" onClick={onClick}>
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
        <h1 className="my-7 text-center text-2xl">E-コンサルにログイン</h1>
        <form onSubmit={login} className="flex w-[308px] flex-col items-center">
          <TextField
            ref={mailAddressRef}
            placeholder="メールアドレス"
            type="email"
            required
            name="mail_address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            placeholder="パスワード"
            type="password"
            required
            name="password"
            className="mt-5"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="mt-2">
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
          <div className="mt-2">
            <GuideLink href="/PasswordResetRequest" onClick={saveRedirectUrl}>
              パスワードを忘れた場合はこちら
            </GuideLink>
          </div>
          <div>
            <PrimaryButton
              size="large"
              type="submit"
              className="
                my-4
                rounded-full
                px-14
                py-2
                w-[190px]
                drop-shadow-[0_4px_10px_rgba(92,107,192,.3)]
              "
            >
              ログイン
            </PrimaryButton>
          </div>
          {errorMessage != '' && <p className="text-center font-bold text-red-500">{errorMessage}</p>}
        </form>
        <div className="mt-6 text-center">
          <a href={nmoLoginUrl}>
            <div
              className="
                flex
                flex-col
                items-center
                gap-2
                rounded
                border
                border-monotone-base
                px-4
                pb-1
                pt-2
                text-sm
                hover:bg-monotone-100
              "
            >
              <img src="images/alliance/logo-nmo-sp.png" alt="" width="100" />
              <div>日経メディカルアカウントでログイン</div>
            </div>
          </a>
          <AppleSignin
            authOptions={{
              clientId: 'jp.medii.e-consult',
              scope: 'email',
              redirectURI: `${process.env.ENDPOINT_URL}/apple_auth/callback`,
              state: '',
              nonce: 'nonce',
              usePopup: false,
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSuccess={(response: any) => console.log(response)}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render={(props: any) => (
              <button
                className="
                  mt-4
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  rounded-md
                  border
                  border-solid
                  border-black
                  px-10
                  py-2
                  hover:bg-monotone-100
                "
                {...props}
              >
                <AiFillApple className="inline" size="30" />
                Appleでログイン
              </button>
            )}
          />
          <div className="mt-4">
            <AppleSignInButton>Appleでログイン</AppleSignInButton>
          </div>
          <div className="mt-4 rounded-md border border-solid border-black px-10 py-2">
            <GoogleLoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};

Login.getLayout = (page: React.ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Login;
