import { InlineNotification } from '@/components/Notification/InlineNotification';
import { useNmo } from '@/hooks/alliance/useNmo';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

export const TopNotifications = () => {
  const router = useRouter();
  const { profile } = useFetchProfile();
  const { isNeedToInputProfile } = useNmo();

  const profileNotification = useMemo(() => {
    if (!profile) {
      return <></>;
    }

    if (profile.status.match(/^PENDING_/)) {
      return (
        <InlineNotification
          text="現在、ご提出いただいた医師確認資料を確認中です。"
          dataTestId="top-notification-pending"
        />
      );
    }

    if (profile.is_imperfect_profile) {
      return (
        <InlineNotification
          text="プロフィール情報が入力されておりません。サービスをご利用いただくためにプロフィールのご入力をお願いいたします。"
          dataTestId="top-notification-is-imperfect-profile"
          buttonText="プロフィール画面を開く"
          buttonOnClick={() => router.push('/editprofile?registerMode=1')}
        />
      );
    }

    if (profile.status === 'PROFILE' || (profile.status === 'CREATED' && profile.need_to_send_confimation)) {
      return (
        <InlineNotification
          text="医師確認資料が提出されておりません。サービスをご利用いただくために医師確認資料のご提出をお願いいたします。"
          dataTestId="top-notification-need-to-send-confirmation"
          buttonText="プロフィール画面を開く"
          buttonOnClick={() => router.push('/document')}
        />
      );
    }
  }, [profile, router]);

  if (!profile) {
    return <></>;
  }

  if (isNeedToInputProfile) {
    return (
      <InlineNotification
        text="すべてのサービスをご利用いただくには、追加のプロフィール入力が必要です。"
        dataTestId="top-notification-nmo-input-profile"
        buttonText="プロフィール入力"
        buttonOnClick={() => router.push('/nmo/input-profile')}
      />
    );
  }

  return <>{profileNotification}</>;
};
