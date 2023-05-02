import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { AiFillApple } from 'react-icons/ai';
import { useLogin } from '@/hooks/useLogin';
import AppleSignin from 'react-apple-signin-auth';
import Link from 'next/link';
import { TextField } from '@/components/Parts/Form/TextField';
import { PublicLayout } from '@/components/Layouts/PublicLayout';

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
    <Link href={href}>
      <a className="text-sm text-guide-link underline" onClick={onClick}>
        {children}
      </a>
    </Link>
  );
};

const Login: NextPageWithLayout = () => {
  const { setEmail, setPassword, login, errorMessage, saveRedirectUrl } =
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
          pt-4
          pb-8
        "
      >
        <h1 className="my-7 text-center text-2xl">E-コンサルにログイン</h1>
        <form onSubmit={login} className="flex w-[308px] flex-col items-center">
          <TextField
            placeholder="メールアドレス"
            type="email"
            name="mail_address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            placeholder="パスワード"
            type="password"
            name="password"
            className="mt-5"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="mt-2">
            <GuideLink href="/registration" onClick={saveRedirectUrl}>
              新規登録はこちら
            </GuideLink>
          </div>
          <div className="mt-2">
            <GuideLink href="/password-reset-request" onClick={saveRedirectUrl}>
              パスワードを忘れた場合はこちら
            </GuideLink>
          </div>
          <div>
            <button
              type="submit"
              className="
                my-4
                rounded-full
                bg-primary
                py-2
                px-14
                text-white
                drop-shadow-[0_4px_10px_rgba(92,107,192,.3)]
              "
            >
              ログイン
            </button>
          </div>
        </form>
        <div>
          <AppleSignin
            authOptions={{
              clientId: 'jp.medii.e-consult',
              scope: 'email',
              redirectURI: `${process.env.ENDPOINT_URL}/api/apple_auth/callback`,
              state: '',
              nonce: 'nonce',
              usePopup: false,
            }}
            onSuccess={(response: any) => console.log(response)}
            render={(props: any) => (
              <button
                className="mt-6 inline-flex items-center rounded-md border border-solid border-black py-2 px-10"
                {...props}
              >
                <AiFillApple className="inline" size="30" />
                Appleでログイン
              </button>
            )}
          />
        </div>
      </div>
      {errorMessage != '' && (
        <p className="text-center font-bold text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

Login.getLayout = (page: React.ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default Login;
