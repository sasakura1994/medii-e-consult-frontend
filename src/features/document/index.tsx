import React, { useCallback, useEffect, useState } from 'react';
import RegistrationProgress, { DocumentMode } from './RegistrationProgress';
import DocumentTypeSelect from './DocumentTypeSelect';
import DoctorNumberForm from './DoctorNumberForm';
import DocumentInputAuto from './DocumentInputAuto';
import DocumentInputDocument from './DocumentInputDocument';
import { Container } from '@/components/Layouts/Container';
import { useRouter } from 'next/router';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';

export type DocumentSelected =
  | ''
  | 'number'
  | 'document'
  | 'auto'
  | 'completed';

export const Document = () => {
  const [selected, setSelected] = useState<DocumentSelected>('');
  const [mode] = useState<DocumentMode>('document');
  const router = useRouter();
  const { postEventLog } = useEventLog();

  const loginRedirectUrlKey = 'Login::RedirectURL';

  const routerPushToWelcomePage = useCallback(async () => {
    await postEventLog({ name: 'document-complete' });
    router.push('/welcome');
  }, [postEventLog, router]);

  useEffect(() => {
    if (selected === 'completed' && localStorage) {
      const savedRedirectUrl = localStorage.getItem(loginRedirectUrlKey);
      if (
        savedRedirectUrl &&
        savedRedirectUrl !== '' &&
        savedRedirectUrl.toLocaleLowerCase() !== '/top'
      ) {
        router.push(savedRedirectUrl);
      } else {
        routerPushToWelcomePage();
      }
    }
  }, [router, routerPushToWelcomePage, selected]);

  return (
    <Container className="mt-4 mb-10">
      <div className="mt-5 flex h-full w-full flex-col items-center justify-center">
        <h1 className="mb-8 text-2xl font-bold lg:mt-5">Medii 会員登録</h1>
        <div className="lg:w-11/12">
          <RegistrationProgress mode={mode} />
        </div>
        {selected === '' && (
          <div className="border-1 rounded-xs mt-10 -mb-20 w-full border bg-white lg:px-20 lg:pb-7">
            <DocumentTypeSelect setSelected={setSelected} />
          </div>
        )}
        {selected === 'number' && (
          <DoctorNumberForm setSelected={setSelected} />
        )}
        {selected === 'document' && (
          <DocumentInputDocument setSelected={setSelected} />
        )}
        {selected === 'auto' && <DocumentInputAuto setSelected={setSelected} />}
      </div>
    </Container>
  );
};
