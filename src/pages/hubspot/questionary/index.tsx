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

    if (!redirect || !accountId || profile === undefined) {
      return;
    }

    if (profile.status === 'VERIFIED' || profile.status.match(/^PENDING_/)) {
      console.log('3');
      const url = new URL(redirect);
      url.searchParams.append('accountid', accountId);
      router.push(url.toString());
    }
  }, [accountId, router, profile]);

  const notification = useMemo(() => {
    if (profile?.status === 'CREATED') {
      return (
        <InlineNotification
          text="プロフィール登録が完了していません。以下より、プロフィール登録をお願いいたします。"
          dataTestId="hubspot-questionary-notification-is-imperfect-profile"
          buttonText="プロフィール登録"
          buttonOnClick={() => router.push('/editprofile?registerMode=true')}
        />
      );
    } else if (profile?.status === 'PROFILE') {
      return (
        <InlineNotification
          text="医師確認が完了していません。以下より、医師確認書類のアップロードをお願いいたします"
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
