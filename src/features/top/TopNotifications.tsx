import { InlineNotification } from '@/components/Notification/InlineNotification';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useRouter } from 'next/router';
import React from 'react';

export const TopNotifications = () => {
  const router = useRouter();
  const { profile } = useFetchProfile();

  if (!profile) {
    return <></>;
  }

  if (profile.is_imperfect_profile) {
    return (
      <InlineNotification
        text="プロフィール情報が入力されておりません。お手数ですがサービスをご利用頂くためにプロフィール画面のご入力をお願いいたします。"
        buttonText="プロフィール画面を開く"
        buttonOnClick={() => router.push('/editprofile?registerMode=1')}
      />
    );
  } else if (profile.need_to_send_confimation) {
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
