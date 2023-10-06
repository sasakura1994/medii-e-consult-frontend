import React from 'react';
import { UseRegisterType } from '@/hooks/useRegister';
import { Footer } from '@/components/Layouts/Footer/Footer';
import { HeaderContainer } from '@/components/Layouts/Header/HeaderContainer';
import { HeaderLogo } from '@/components/Layouts/Header/HeaderLogo';
import { HeaderMenuList } from '@/components/Layouts/Header/HeaderMenuList';
import TertiaryButton from '@/components/Button/TertiaryButton';
import Link from 'next/link';

export const RegistrationCompleted = (props: UseRegisterType) => {
  const { loginUrl } = props;

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
        <div
          className="
            mx-auto flex w-fit items-stretch justify-center rounded-md
            border border-slate-300 bg-white px-8 py-4 md:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]
          "
        >
          <p>
            ご入力頂いたメールアドレスに確認用のメールをお送りしました。
            <br />
            メール本文内のリンクからパスワードの設定をお願いいたします。
          </p>
        </div>
      </main>
      <Footer noMenu />
    </div>
  );
};
