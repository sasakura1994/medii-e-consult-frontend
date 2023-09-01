import { InlineNotification } from '@/components/Notification/InlineNotification';
import { useNmo } from '@/hooks/alliance/useNmo';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useRouter } from 'next/router';
import React from 'react';

export const TopNotifications = () => {
  const router = useRouter();
  const { profile } = useFetchProfile();
  const { isNeedToInputProfile } = useNmo();

  if (!profile) {
    return <></>;
  }

  if (isNeedToInputProfile) {
    return (
      <InlineNotification
        text="すべてのサービスをご利用いただくには、追加のプロフィール入力が必要です。"
        buttonText="プロフィール入力"
        buttonOnClick={() => router.push('/nmo/input-profile')}
      />
    );
  }

  if (profile.is_imperfect_profile) {
    return (
      <InlineNotification
        text="プロフィール情報が入力されておりません。お手数ですがサービスをご利用頂くためにプロフィール画面のご入力をお願いいたします。"
        buttonText="プロフィール画面を開く"
        buttonOnClick={() => router.push('/editprofile?registerMode=1')}
      />
    );
  } else if (profile.status === 'PROFILE') {
    return (
      <InlineNotification
        text="確認資料が提出されておりません。お手数ですがサービスをご利用頂くためにプロフィール画面から確認資料をご提出ください。"
        buttonText="プロフィール画面を開く"
        buttonOnClick={() => router.push('/document')}
      />
    );
  }

  return <></>;
};
