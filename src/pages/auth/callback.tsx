import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { useAuthCallback } from '@/features/auth/useAuthCallback';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { Card } from '@/components/Parts/Card/Card';
import { HeaderLogoOnly } from '@/components/Layouts/Header/HeaderLogoOnly';
import Link from 'next/link';

const AuthCallbackPage: NextPageWithLayout = () => {
  const { isFailed } = useAuthCallback();

  return (
    <div className="flex h-[100vh] flex-col bg-bg">
      <HeaderLogoOnly />
      <div className="flex flex-1 items-center justify-center">
        <Card className="mx-auto px-8 py-20 lg:max-w-[750px] lg:px-20">
          {isFailed ? (
            <div>
              <p>
                ログインに失敗しました。恐れ入りますが、再度ログインをお試しください。
                <br />
                ログインに関して問題がある場合は、サポートまでお問い合わせください。
              </p>
              <div className="mt-10 text-center text-text-link underline">
                <div>
                  <Link href="/login">ログイン</Link>
                </div>
                <div className="mt-4">
                  <a
                    href="https://tayori.com/form/62897c986d36f5b573fec1a04508f24b70b11fe6/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    お問い合わせ
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div>E-コンサルに遷移中です</div>
              <div className="mt-10">
                <SpinnerBorder />
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

AuthCallbackPage.getLayout = (page: React.ReactElement) => {
  return page;
};

export default AuthCallbackPage;
