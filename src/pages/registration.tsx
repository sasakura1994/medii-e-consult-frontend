import React from 'react';
import Link from 'next/link';
import { useRegister } from '@/hooks/useRegister';
import { NextPageWithLayout } from './_app';
import { TextField } from '@/components/Parts/Form/TextField';
import { CheckBox } from '@/components/Parts/Form/CheckBox';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';
import { Footer } from '@/components/Layouts/Footer/Footer';
import { HeaderContainer } from '@/components/Layouts/Header/HeaderContainer';
import { HeaderLogo } from '@/components/Layouts/Header/HeaderLogo';
import { HeaderMenuList } from '@/components/Layouts/Header/HeaderMenuList';
import TertiaryButton from '@/components/Button/TertiaryButton';

const GuideLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <Link href={href}>
      <a className="mt-6 text-sm text-guide-link underline">{children}</a>
    </Link>
  );
};

const Registration: NextPageWithLayout = () => {
  const {
    setEmail,
    register,
    goToSnsLogin,
    loginUrl,
    setIsPrivacyPolicyAgree,
    setIsTermsAgree,
    isEmailDuplicated,
    isSent,
    errorMessage,
  } = useRegister();
  return (
    <>
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
          {isSent ? (
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
          ) : (
            <div className="mx-auto flex justify-center md:py-4">
              <div
                className="
              flex flex-col items-stretch justify-center md:flex-row md:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] lg:mb-8
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
                  <div className="mt-2 text-sm font-light lg:text-[16px]">※医師・医学生専用のサービスです</div>
                  <p className="mt-6 hidden text-sm font-light lg:block">
                    E-コンサルに会員登録すると、利用規約とプライバシーポリシーに同意したものとみなされます。
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      register();
                    }}
                  >
                    <TextField
                      name="email"
                      placeholder="メールアドレス"
                      type="email"
                      className="my-4"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                    {errorMessage != '' && <ErrorMessage className="mt-6 text-center">{errorMessage}</ErrorMessage>}
                    {isEmailDuplicated && (
                      <ErrorMessage className="text-center">
                        <Link href="/passwordresetrequest">こちら</Link>
                        よりパスワードの設定をお願いします。
                      </ErrorMessage>
                    )}
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="
                    mb-2 mt-10 rounded-full bg-primary px-10 py-3 text-lg font-bold
                    text-white drop-shadow-[0_4px_10px_rgba(92,107,192,.3)]
                  "
                      >
                        確認メールを送信
                      </button>
                    </div>
                  </form>
                  <a
                    href="#"
                    className="mt-6 text-sm text-guide-link underline"
                    onClick={(e) => {
                      e.preventDefault();
                      goToSnsLogin();
                    }}
                  >
                    SNSアカウントで登録はこちら
                  </a>
                  <GuideLink href={loginUrl}>ログインはこちら</GuideLink>
                  <a
                    // eslint-disable-next-line max-len
                    href="https://tayori.com/faq/4cb3c7c0fd09ab493d1efcbf01dcf76729c62202/category/fea2bb08831c952f089f3f8a91b98f72c6ec300b/"
                    className="mt-6 text-sm underline"
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    登録にお困りの方はこちら
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Registration;

Registration.getLayout = (page: React.ReactElement) => {
  return page;
};
