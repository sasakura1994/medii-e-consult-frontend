import React from 'react';
import { MyPageMenu } from '@/components/Parts/Menu/MyPageMenu';
import type { NextPageWithLayout } from '@/pages/_app';
import { UrlPublish } from '@/features/mypages/editProfile/UrlPublish';
import { useEditProfilePage } from '@/features/mypages/editProfile/useEditProfilePage';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import Link from 'next/link';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import { useAuthentication } from '@/hooks/authentication/useAuthentication';

const EditProfileCompletedPage: NextPageWithLayout = () => {
  const editProfilePage = useEditProfilePage();
  const { isRegisterMode } = editProfilePage;
  const { profile } = useFetchProfile();
  const { signOut } = useAuthentication();

  return (
    <>
      <h1 className="mb-10 text-center text-2xl leading-9">マイページ</h1>
      <MyPageMenu />
      {!isRegisterMode && profile?.want_to_be_consultant && <UrlPublish />}
      <div className="mt-4">
        <div className="px-4 py-4">
          <div className="text-center">
            <p>プロフィールを更新しました。</p>

            <div className="pt-4">
              <Link href="/top" className="text-primary underline">
                ホーム画面に戻る
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center lg:pb-20">
          <button type="button" className="text-[#999999] underline" onClick={signOut}>
            ログアウト
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfileCompletedPage;

EditProfileCompletedPage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
