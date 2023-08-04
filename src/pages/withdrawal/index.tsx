import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import ErrorButton from '@/components/Button/ErrorButton';
import Link from 'next/link';
import { useWithdrawalPage } from '@/features/mypages/editProfile/useWithdrawalPage';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { useAuthenticationOnPage } from '@/hooks/authentication/useAuthenticationOnPage';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb';
import { BreadcrumbLink } from '@/components/Breadcrumb/BreadcrumbLink';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { CheckBox } from '@/components/Parts/Form/CheckBox';

const WithdrawalPage: NextPageWithLayout = () => {
  useAuthenticationOnPage();
  const { isSending, questionaryItems, selectedQuestionaryItemIds, toggleQuestionaryItem, withdraw } =
    useWithdrawalPage();
  const { profile, isLoading } = useFetchProfile();

  return (
    <div className="mx-auto mt-8 max-w-[1024px] px-4 pb-20 lg:px-0">
      <Breadcrumb>
        <BreadcrumbLink href="/top">TOP</BreadcrumbLink>
        <BreadcrumbLink href="/editprofile">マイページ</BreadcrumbLink>
        <BreadcrumbLink href="/withdrawal/confirm">アカウント削除</BreadcrumbLink>
      </Breadcrumb>
      <h2 className="mt-2 text-xxl font-semibold">アカウント削除</h2>
      {isLoading || !profile || !questionaryItems ? (
        <div className="flex justify-center">
          <SpinnerBorder />
        </div>
      ) : (
        <>
          <div className="mt-10 text-md">よろしければ、アカウント削除理由をお聞かせください。（複数回答可）</div>
          <div className="mt-6 flex flex-col gap-2">
            {questionaryItems.map((questionaryItem) => (
              <div key={questionaryItem.id}>
                <CheckBox
                  label={questionaryItem.text}
                  checked={selectedQuestionaryItemIds.includes(questionaryItem.id)}
                  name={`questionary${questionaryItem.id}`}
                  onChange={() => toggleQuestionaryItem(questionaryItem.id)}
                />
              </div>
            ))}
          </div>
          {profile.registration_source === 'nmo' && (
            <p className="my-10 text-left" data-testid="nmo-notice">
              日経メディカル Onlineとの接続を解除し、Mediiでの会員情報を削除します。
              <br />
              Mediiを退会しても日経メディカル Onlineは引き続きご利用可能です。
              <br />
              ※Medii退会後、再度日経メディカルOnlineと接続した場合、氏名などのプロフィール入力が必要となります。
            </p>
          )}
          <div className="mt-10 flex justify-center gap-8">
            {isSending ? (
              <SpinnerBorder />
            ) : (
              <div className="flex justify-center gap-3">
                <Link href="/editprofile">
                  <a className="block flex-1">
                    <SecondaryButton size="large" className="px-8">
                      戻る
                    </SecondaryButton>
                  </a>
                </Link>
                <ErrorButton type="button" size="large" onClick={withdraw}>
                  アカウントを削除
                </ErrorButton>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WithdrawalPage;
