import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { DocumentMode } from './RegistrationProgress';
import { DocumentSelected } from '.';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const loginRedirectUrlKey = 'Login::RedirectURL';

export const useDocument = () => {
  const [selected, setSelected] = useState<DocumentSelected>('');
  const [mode, setMode] = useState<DocumentMode>('document');
  const router = useRouter();
  const { postEventLog } = useEventLog();
  const { getItem, removeItem } = useLocalStorage();

  const routerPushToQuestionaryPage = useCallback(async () => {
    await postEventLog({ name: 'document-complete' });
    router.push('/onboarding/questionary');
  }, [postEventLog, router]);

  const setSelectedWithRedirect = useCallback(
    async (value: DocumentSelected) => {
      setSelected(value);
      if (value === 'completed') {
        const savedRedirectUrl = getItem(loginRedirectUrlKey);
        if (savedRedirectUrl && savedRedirectUrl !== '' && savedRedirectUrl.toLocaleLowerCase() !== '/top') {
          router.push(savedRedirectUrl);
        } else {
          await routerPushToQuestionaryPage();
        }
        removeItem(loginRedirectUrlKey);
      }
    },
    [getItem, removeItem, router, routerPushToQuestionaryPage]
  );

  return {
    mode,
    selected,
    setMode,
    setSelected,
    setSelectedWithRedirect,
  };
};
