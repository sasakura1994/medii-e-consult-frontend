import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { AiFillApple } from 'react-icons/ai';
import { useLogin } from '@/hooks/useLogin';
import { useRouter } from 'next/router';
import AppleSignin from 'react-apple-signin-auth';

const TextField = (props: JSX.IntrinsicElements['input']) => {
  return (
    <input
      className="border-text-field-frame h-12 rounded border border-solid w-80 p-4 mb-4"
      {...props}
    />
  );
};

const GuideLink = ({children}: {children: string}) =>
{
    return (
      <a className="text-guide-link underline text-sm">
        {children}
      </a>
    );
}
const Login: NextPage = () =>
{
  const { email, setEmail, password, setPassword, login, token } = useLogin();
  const router = useRouter();
  useEffect( () =>
  {
    if ( token !== "" )
    {
        router.replace( (router.query.redirect as string) ?? '/top');
     }
   }, [token])
  return (
    <div className="mt-6 mb-12">
      <div className="mx-auto flex w-login-container max-w-login-container flex-col items-center border border-solid border-login-container-frame bg-white py-4">
        <h1 className="my-6 text-center text-2xl">E-コンサルにログイン</h1>
        <TextField
          placeholder="メールアドレス"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          placeholder="パスワード"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="mt-2">
          <GuideLink>新規登録はこちら</GuideLink>
        </div>
        <div className="mt-2">
          <GuideLink>パスワードを忘れた場合はこちら</GuideLink>
        </div>
        <div>
          <button
            onClick={() => login()}
            className="my-4 rounded-full bg-primary py-2 px-14 text-white drop-shadow-[0_4px_10px_rgba(92,107,192,.3)]"
          >
            ログイン
          </button>
        </div>
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
            onSuccess={(response) => console.log(response)}
            render={(props) => (
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
    </div>
  );
};

export default Login;
