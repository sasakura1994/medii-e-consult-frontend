import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { Card } from '@/components/Parts/Card/Card';
import { Header } from '@/components/Layouts/Header/Header';
import TertiaryButton from '@/components/Button/TertiaryButton';
import ErrorButton from '@/components/Button/ErrorButton';
import Link from 'next/link';
import { useWithdrawalPage } from '@/features/mypages/editProfile/useWithdrawalPage';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { useAuthenticationOnPage } from '@/hooks/authentication/useAuthenticationOnPage';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';

const WithdrawPage: NextPageWithLayout = () => {
  useAuthenticationOnPage();
  const { isSending, withdraw } = useWithdrawalPage();
  const { profile, isLoading } = useFetchProfile();

  return (
    <div className="flex h-[100vh] flex-col bg-bg">
      <Header />
      <div className="flex flex-1 items-center justify-center">
        <Card className="mx-auto w-full px-8 py-20 lg:w-[750px] lg:px-20">
          <div className="text-center">
            {isLoading || !profile ? (
              <SpinnerBorder />
            ) : (
              <>
                <div className="text-medii-xl font-bold">アカウントを削除します</div>
                {profile.registration_source === 'nmo' && (
                  <p className="my-10 text-left">
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
                    <>
                      <Link href="/editprofile">
                        <a className="block flex-1">
                          <TertiaryButton className="w-full">キャンセル</TertiaryButton>
                        </a>
                      </Link>
                      <ErrorButton type="button" className="flex-1" onClick={withdraw}>
                        削除する
                      </ErrorButton>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

WithdrawPage.getLayout = (page: React.ReactElement) => {
  return page;
};

export default WithdrawPage;
