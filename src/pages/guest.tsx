import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { Card } from '@/components/Parts/Card/Card';
import { HeaderLogoOnly } from '@/components/Layouts/Header/HeaderLogoOnly';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Query = {
  redirect?: string;
};

const GuestPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { redirect } = router.query as Query;

  return (
    <div className="flex h-[100vh] flex-col bg-bg">
      <HeaderLogoOnly />
      <div className="flex flex-1 items-center justify-center">
        <Card className="mx-auto p-20 lg:max-w-[700px]">
          <div>
            <p>
              サービスをご利用いただくにはMediiへの登録が必要となります。
              <br />
              以下のURLから会員登録をしていただくか、連携元のサービスから通常アカウントでログインしてください。
            </p>
            <div className="mt-10 text-center text-text-link underline">
              <div>
                <Link
                  href={`/registration${
                    redirect
                      ? `?redirect=${encodeURIComponent(redirect ?? '')}`
                      : ''
                  }`}
                >
                  会員登録
                </Link>
              </div>
              <div className="mt-4">
                <Link href="/top">Topに戻る</Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

GuestPage.getLayout = (page: React.ReactElement) => {
  return page;
};

export default GuestPage;
