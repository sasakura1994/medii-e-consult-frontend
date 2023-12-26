import { useToken } from '@/hooks/authentication/useToken';
import { useProfile } from '@/hooks/useProfile';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';

type Query = {
  id: string;
};

export const useQuestionary = () => {
  const router = useRouter();
  const { accountId } = useToken();
  const { email, profile } = useProfile();
  const { id: fromId } = router.query as Query;
  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    if (!email || !accountId || !isFormReady) return;

    const iframeElement = window.document.getElementsByTagName('iframe')[0];
    if (!iframeElement.contentDocument) return;

    // accountidとemailを設定する（この要素名でないとアンケートフォームに埋め込むことはできない）
    const accountIdInput = iframeElement.contentDocument.querySelector('input[name="accountid"].hs-input');
    const chatRoomIdInput = iframeElement.contentDocument.querySelector('input[name="email"].hs-input');

    if (accountIdInput && chatRoomIdInput) {
      accountIdInput.setAttribute('value', accountId);
      chatRoomIdInput.setAttribute('value', email.mail_address);
    }
  }, [accountId, isFormReady, email]);

  const isAvailable = useMemo(() => {
    if (
      process.env.HUBSPOT_PORTAL_ID &&
      fromId &&
      profile &&
      (profile.status === 'VERIFIED' || profile.status.startsWith('PENDING_'))
    ) {
      return true;
    }
    return false;
  }, [fromId, profile]);

  return { profile, router, isAvailable, fromId, setIsFormReady };
};
