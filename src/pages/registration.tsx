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
import { HeaderMenuListItem } from '@/components/Layouts/Header/HeaderMenuListItem';

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
    queryString,
    goToSnsLogin,
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
          <div className="flex items-center">
            <HeaderLogo />
            <HeaderMenuList>
              <HeaderMenuListItem href="/login">ログイン</HeaderMenuListItem>
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
              mb-8 flex flex-col items-stretch justify-center md:flex-row md:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]
            "
              >
                <img src="/images/registration/left.png" className="hidden max-w-[480px] bg-white md:block" alt="" />
                <img
                  src="/images/registration/mobile_main.png"
                  className="bg-white md:hidden lg:max-w-[480px]"
                  alt=""
                />
                <div
                  className="
                flex max-w-[480px] flex-col items-center justify-items-stretch bg-white
                px-4 pb-6 md:pb-4 md:pl-8 md:pr-12 md:pt-12
                "
                >
                  <h1 className="my-6 text-center text-2xl text-primary">新規会員登録</h1>
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
                    <p className="w-full">個人情報の取扱いについて</p>
                    <div className="h-[238px] overflow-y-scroll rounded-sm border border-slate-400 p-4 leading-[160%]">
                      株式会社Medii（以下当社）は、会員登録で取得する個人情報を以下の通り取扱います。
                      <br />
                      1. 利用目的
                      <br />
                      E-コンサルサービス提供のため（必要なアクセス権限の付与、確認を含む。なお、当社の各サービスにおける利用目的は各サービスの利用規約に表示）
                      <br />
                      2. 個人情報の第三者提供について
                      <br />
                      取得した個人情報は、本人からの事前の同意取得、又は法定の除外事由を除き第三者に提供することはありません。
                      <br />
                      ※会員医師がコンサルトを依頼する情報、およびメンター医師が回答する情報について、当社が独自の目的で利用することはありません。
                      また、会員医師がメンター医師に対するコンサルト依頼に関連して行なう情報提供は、国のガイダンスで認められる範囲内に限られます。
                      <br />
                      3. 個人情報取扱の委託について
                      <br />
                      安定したサービスの提供のために、個人情報の取扱いを含む業務の一部を委託することがあります。
                      <br />
                      その際も情報の取扱い適格を有すると評価した者にのみ委託します。
                      <br />
                      4.個人情報の取扱いに関する請求について
                      <br />
                      個人情報により特定されるご本人から利用目的の通知、開示、内容の訂正、追加又は削除、利用の停止、消去及び第三者への提供の停止（以下「開示等」という）のお申し出があった場合は対応いたします。
                      <br />
                      個人情報保護管理者にお問い合わせください。
                      <br />
                      5. 任意性
                      <br />
                      当社への個人情報のご提供は任意ですが、ご提供いただけない場合、当社として会員登録その他サービスを適切に提供できなくなるおそれがあります。
                      <br />
                      6. お問い合わせ先
                      <br />
                      取締役個人情報保護管理者 e-mail: info@medii.jp
                    </div>
                    <div className="mt-2 w-full">
                      <label>
                        <CheckBox
                          name="privacyPolicy"
                          onChange={(e) => {
                            setIsPrivacyPolicyAgree(e.target.checked);
                          }}
                        />
                        個人情報の取り扱いについて同意します。
                      </label>
                    </div>
                    <div className="mt-2 w-full">
                      <label>
                        <CheckBox
                          name="termsAgree"
                          onChange={(e) => {
                            setIsTermsAgree(e.target.checked);
                          }}
                        />
                        <a href="https://e-consult.medii.jp/doc/terms_of_usage.pdf" className="text-[-webkit-link]">
                          利用規約
                        </a>
                        の取り扱いについて同意します。
                      </label>
                    </div>
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
                  <GuideLink href={`/login${queryString}`}>ログインはこちら</GuideLink>
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
