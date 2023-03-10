import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { AiFillApple } from 'react-icons/ai';
import { useLogin } from '@/hooks/useLogin';
import { useRouter } from 'next/router';
import AppleSignin from 'react-apple-signin-auth';
import Link from 'next/link';

const TextField = (props: JSX.IntrinsicElements['input']) => {
  return (
    <input
      className="mb-4 h-12 w-80 rounded border border-solid border-text-field-frame p-4"
      {...props}
    />
  );
};

const GuideLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <Link href={href}>
      <a className="text-sm text-guide-link underline">{children}</a>
    </Link>
  );
};
const Login: NextPage = () => {
  const { setEmail, setPassword, login, token, errorMessage } = useLogin();
  const router = useRouter();
  useEffect(() => {
    if (token !== '') {
      router.replace((router.query.redirect as string) ?? '/top');
    }
  }, [token]);
  return (
    <div className="bg-[url('/images/registration/bg.png')] pt-14">
      <div className="shadow-[0_4px_4px_rgb(0 0 0 / 25%)] mx-auto flex items-center bg-white py-4">
        <img src="/images/registration/left.png" className="w-[480px]" />
        <div>
          <h1 className="my-6 text-center text-2xl text-primary">新規会員登録</h1>
        </div>
      </div>
      {errorMessage != '' && (
        <p className="text-center font-bold text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Login;
