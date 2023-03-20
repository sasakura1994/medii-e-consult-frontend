import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { PublicLayout } from '@/components/Layouts/PublicLayout';
import { Card } from '@/components/Parts/Card/Card';
import { TextField } from '@/components/Parts/Form/TextField';
import { useInitPassword } from '@/features/password/initPassword/useInitPassword';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';
import { Checkbox } from '@/components/Parts/Form/Checkbox';
import Link from 'next/link';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';

const PasswordResetPage: NextPageWithLayout = () => {
  const {
    errorMessage,
    firstPassword,
    isEmailDuplicated,
    isPasswordNotMatched,
    isSending,
    isTokenExists,
    secondPassword,
    setFirstPassword,
    setSecondPassword,
  } = useInitPassword();

  return (
    <>
      <Card className="py-10 px-4">
        <h1 className="text-center text-2xl">パスワード登録</h1>
        <div className="mt-8 flex  justify-center">
          <div className="w-[308px]">
            <div className="font-bold">パスワード</div>
            <div className="mt-1">
              <TextField
                type="password"
                name="first_password"
                value={firstPassword}
                onChange={(e) => setFirstPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-4 font-bold">パスワード(確認)</div>
            <div className="mt-1">
              <TextField
                type="password"
                name="second_password"
                value={secondPassword}
                onChange={(e) => setSecondPassword(e.target.value)}
                required
              />
            </div>
            {isPasswordNotMatched && (
              <ErrorMessage>パスワードが一致していません</ErrorMessage>
            )}
          </div>
        </div>
        <div className="mx-auto mt-7 text-sm lg:w-[476px]">
          <p>
            以下の内容をご確認いただき、同意いただけましたらチェックして会員登録にお進みください。
          </p>
          <div className="mt-5">
            <Checkbox
              id="agree-privacy-policy"
              name="agree_privacy_policy"
              label={
                <>
                  <Link href="/PrivacyPolicy">プライバシーポリシー</Link>
                  に同意します。
                </>
              }
            />
          </div>
          <div className="mt-5">
            <Checkbox
              id="agree-terms-of-use"
              name="agree_terms_of_use"
              label={
                <>
                  <a href="https://e-consult.medii.jp/doc/terms_of_usage.pdf">
                    利用規約
                  </a>
                  に同意します。
                </>
              }
            />
          </div>
          <div className="mt-5">
            <Checkbox
              id="agree-details"
              name="agree_details"
              label={
                <>
                  以下の項目につき確認の上、その内容に同意します。
                  <div className="flex flex-col gap-4">
                    <p>
                      1.
                      本サービスにおいて、当社は会員同士が専門医の医学的知見・経験を共有するためのプラットフォームを運営するにとどまり、当社自身が医学的知見・経験を提供するものではなく、その情報が完全性、正確性、有用性を有することについて、何ら保証するものではありません。コンサルティングの内容については、主治医において最終判断を行い、患者様への診断・治療の責任は主治医において負うものであることに、同意します。
                    </p>
                    <p>
                      2.
                      本サービスを通じて行われる専門医の医学的知見・経験の提供は、あくまで医療情報の提供を目的としており、診断・治療又はこれに準ずる行為を含まないことに同意します。
                    </p>
                    <p>
                      3.
                      会員は、本サービスを利用するにあたり、患者様の健康状態や病歴等の医療情報が、当社及び会員に提供され取り扱われることにつき、患者様から予め同意を得ていることを確認します。
                    </p>
                    <p>
                      4.
                      会員は、自己の所属機関及び専門科、患者に対する自己の診断内容に関する情報を当社が取得し取り扱うことにつき、同意します。
                    </p>
                  </div>
                </>
              }
            />
          </div>
        </div>
        <div className="my-6 text-center">
          {!isSending ? (
            <button type="button">送信</button>
          ) : (
            <div className="mt-4 text-center">
              <SpinnerBorder />
            </div>
          )}
        </div>
        {!isTokenExists && (
          <ErrorMessage className="text-center">
            トークンが指定されていません
          </ErrorMessage>
        )}
        {errorMessage !== '' && (
          <ErrorMessage className="text-center">{errorMessage}</ErrorMessage>
        )}
        {isEmailDuplicated && (
          <ErrorMessage className="mt-4 text-center">
            <Link href="/Login">
              <a
                className="text-inherit underline"
                style={{ color: '-webkit-link' }}
              >
                ログイン画面
              </a>
            </Link>{' '}
            よりログインし直すか{' '}
            <Link href="/PasswordResetRequest">
              <a className="underline" style={{ color: '-webkit-link' }}>
                パスワードの再設定
              </a>
            </Link>{' '}
            をお願いします。
          </ErrorMessage>
        )}
      </Card>
    </>
  );
};

PasswordResetPage.getLayout = (page: React.ReactElement) => {
  return <PublicLayout>{page}</PublicLayout>;
};

export default PasswordResetPage;
