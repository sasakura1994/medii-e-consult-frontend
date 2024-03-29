import React from 'react';
import { InlineNotification } from '@/components/Notification/InlineNotification';
import { useToken } from '@/hooks/authentication/useToken';
import { useProfile } from '@/hooks/useProfile';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

const HubSpotQuestionaryPage = () => {
  const router = useRouter();
  const { accountId } = useToken();
  const { profile } = useProfile();

  useEffect(() => {
    const redirectMatch = router.asPath.match(/redirect=([^&]+(&[^&]+)*)/);
    const redirect = redirectMatch ? decodeURIComponent(redirectMatch[1]) : null;

    if (!redirect || !accountId || !profile) {
      return;
    }

    if (profile.status === 'VERIFIED' || profile.status.match(/^PENDING_/)) {
      const url = new URL(redirect);
      url.searchParams.append('accountid', accountId);
      router.push(url.toString());
    }
  }, [accountId, router, profile]);

  const notification = useMemo(() => {
    if (profile?.status === 'CREATED') {
      return (
        <InlineNotification
          text="プロフィール情報が入力されておりません。アンケートにご回答いただくためにプロフィールのご入力をお願いいたします。
                会員登録いただくことで、アンケート謝礼ポイントの進呈および、ポイント交換が可能になります。"
          dataTestId="hubspot-questionary-notification-is-imperfect-profile"
          buttonText="プロフィール登録"
          buttonOnClick={() => router.push('/editprofile?registerMode=true')}
        />
      );
    } else if (profile?.status === 'PROFILE') {
      return (
        <InlineNotification
          text="医師確認資料が提出されておりません。アンケートにご回答いただくために医師確認資料のご提出をお願いいたします。会員登録いただくことで、アンケート謝礼ポイントの進呈および、ポイント交換が可能になります。"
          dataTestId="hubspot-questionary-notification-need-to-send-confirmation"
          buttonText="医師確認"
          buttonOnClick={() => router.push('/document')}
        />
      );
    }
  }, [profile, router]);

  return <>{notification}</>;
};

export default HubSpotQuestionaryPage;
