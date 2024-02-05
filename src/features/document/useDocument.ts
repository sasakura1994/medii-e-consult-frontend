import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { DocumentMode } from './RegistrationProgress';
import { DocumentSelected } from '.';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useFetchFlag } from '@/hooks/api/account/useFetchFlags';
import { useProfile } from '@/hooks/useProfile';

const loginRedirectUrlKey = 'Login::RedirectURL';

export const useDocument = () => {
  const [selected, setSelected] = useState<DocumentSelected>('');
  const [mode, setMode] = useState<DocumentMode>('document');
  const router = useRouter();
  const { postEventLog } = useEventLog();
  const { getItem, removeItem } = useLocalStorage();
  const { flag: isOnboardingAnswered } = useFetchFlag('OnboardingAnswered');
  const { profile, isOnboardingQuestionaryIsNotNeeded } = useProfile();

  const setSelectedWithRedirect = useCallback(
    async (value: DocumentSelected) => {
      setSelected(value);
      if (value === 'completed') {
        const savedRedirectUrl = getItem(loginRedirectUrlKey);
        if (savedRedirectUrl && savedRedirectUrl !== '' && savedRedirectUrl.toLocaleLowerCase() !== '/top') {
          removeItem(loginRedirectUrlKey);
          router.push(savedRedirectUrl);
          return;
        }

        removeItem(loginRedirectUrlKey);
        await postEventLog({ name: 'document-complete' });

        if (isOnboardingAnswered === true || isOnboardingQuestionaryIsNotNeeded) {
          router.push('/top');
          return;
        }

        router.push('/onboarding/questionary');
      }
    },
    [getItem, isOnboardingAnswered, isOnboardingQuestionaryIsNotNeeded, postEventLog, removeItem, router]
  );

  return {
    isOnboardingQuestionaryIsNotNeeded,
    mode,
    profile,
    selected,
    setMode,
    setSelected,
    setSelectedWithRedirect,
  };
};
