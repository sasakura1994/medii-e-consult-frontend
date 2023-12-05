import { useToken } from '@/hooks/authentication/useToken';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const HubSpotQuestionaryPage = () => {
  const router = useRouter();
  const { accountId } = useToken();

  useEffect(() => {
    const redirectMatch = router.asPath.match(/redirect=([^&]+(&[^&]+)*)/);
    const redirect = redirectMatch ? decodeURIComponent(redirectMatch[1]) : null;

    if (!redirect || !accountId) {
      return;
    }

    const url = new URL(redirect);
    url.searchParams.append('accountid', accountId);
    router.push(url);
  }, [accountId, router]);
};

export default HubSpotQuestionaryPage;
