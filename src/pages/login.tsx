import React from 'react';
import type { NextPage } from 'next';
import { AiFillApple } from 'react-icons/ai';
import { useLogin } from '@/hooks/useLogin';

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
  const { email, setEmail, password, setPassword, login } = useLogin();
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
          <button onClick={ () => login()} className="my-4 rounded-full bg-primary py-2 px-14 text-white drop-shadow-[0_4px_10px_rgba(92,107,192,.3)]">
            ログイン
          </button>
        </div>
        <div>
          <button className="mt-6 inline-flex items-center rounded-md border border-solid border-black py-2 px-10">
            <AiFillApple className="inline" size="30" />
            Appleでログイン
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
