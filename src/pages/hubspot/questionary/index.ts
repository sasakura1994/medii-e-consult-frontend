import { useToken } from '@/hooks/authentication/useToken';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const HubSpotQuestionaryPage = () => {
  const router = useRouter();
  const { accountId } = useToken();
  const { redirect } = router.query;

  useEffect(() => {
    router.push(redirect + '?accountId=' + accountId);
  }, [accountId]);
};

export default HubSpotQuestionaryPage;
