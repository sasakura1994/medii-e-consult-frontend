import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRegister } from '@/hooks/useRegister';

const TextField = (props: JSX.IntrinsicElements['input']) => {
  return (
    <input
      className="mb-4 h-12 w-full rounded border border-solid border-text-field-frame p-4"
      {...props}
    />
  );
};

const CheckBox = (props: {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      onChange={props.onChange}
      type="checkbox"
      className="relative float-left mt-[0.15rem] mr-[6px] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] checked:border-primary checked:bg-primary checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:content-[''] hover:cursor-pointer"
    />
  );
};

const GuideLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <Link href={href}>
      <a className="mt-6 text-sm text-guide-link underline">{children}</a>
    </Link>
  );
};

const Registration: NextPage = () => {
  const {
    setEmail,
    register,
    setIsPrivacyPolicyAgree,
    setIsTermsAgree,
    isSent,
    errorMessage,
  } = useRegister();
  return (
    <div className="bg-[url('/images/registration/bg.png')] md:py-14">
      {isSent ? (
        <div className="shadow-[0_4px_4px_rgb(0 / 25%)] 0 0 mx-auto flex w-fit items-stretch justify-center rounded-md border border-slate-300 bg-white py-4 px-8">
          <p>
            ご入力頂いたメールアドレスに確認用のメールをお送りしました。
            <br />
            メール本文内のリンクからパスワードの設定をお願いいたします。
          </p>
        </div>
      ) : (
        <div className="shadow-[0_4px_4px_rgb(0 / 25%)] 0 0 mx-auto flex flex-col items-stretch justify-center md:flex-row md:py-4">
          <img
            src="/images/registration/left.png"
            className="hidden max-w-[480px] bg-white md:block"
          />
          <img
            src="/images/registration/mobile_main.png"
            className="max-w-[480px] bg-white md:hidden"
          />
          <div className="flex max-w-[480px] flex-col items-center justify-items-stretch bg-white pl-[30px] pr-[48px] pb-14 md:pt-[64px] md:pb-4">
            <h1 className="my-6 text-center text-2xl text-primary">
              新規会員登録
            </h1>
            <p className="mb-4">E-コンサルは医師・医学生専用のサービスです。</p>
            <TextField
              placeholder="メールアドレス"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <p>個人情報の取扱いについて</p>
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
              ※会員医師がコンサルトを依頼する情報、およびメンター医師が回答する情報について、当社が独自の目的で利用することはありません。また、会員医師がメンター医師に対するコンサルト依頼に関連して行なう情報提供は、国のガイダンスで認められる範囲内に限られます。
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
            <div className="mt-2">
              <label>
                <CheckBox
                  onChange={(e) => {
                    setIsPrivacyPolicyAgree(e.target.checked);
                  }}
                />
                個人情報の取り扱いについて同意します。
              </label>
            </div>
            <div className="mt-2">
              <label>
                <CheckBox
                  onChange={(e) => {
                    setIsTermsAgree(e.target.checked);
                  }}
                />
                <a href="https://e-consult.medii.jp/doc/terms_of_usage.pdf">
                  利用規約
                </a>
                の取り扱いについて同意します。
              </label>
            </div>
            {errorMessage != '' && (
              <p className="mt-6 text-center font-bold text-red-500">
                {errorMessage}
              </p>
            )}
            <button
              onClick={() => register()}
              className="mt-10 mb-2 rounded-full bg-primary py-3 px-10 text-lg font-bold text-white  drop-shadow-[0_4px_10px_rgba(92,107,192,.3)]"
            >
              確認メールを送信
            </button>
            <GuideLink href="/sns-registration">
              SNSアカウントで登録はこちら
            </GuideLink>
            <GuideLink href="/login">ログインはこちら</GuideLink>
            <GuideLink href="https://tayori.com/faq/4cb3c7c0fd09ab493d1efcbf01dcf76729c62202/category/fea2bb08831c952f089f3f8a91b98f72c6ec300b/">
              登録にお困りの方はこちら
            </GuideLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
