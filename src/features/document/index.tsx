import React, { useCallback, useState } from 'react';
import RegistrationProgress, { DocumentMode } from './RegistrationProgress';
import DocumentTypeSelect from './DocumentTypeSelect';
import DoctorNumberForm from './DoctorNumberForm';
import DocumentInputAuto from './DocumentInputAuto';
import DocumentInputDocument from './DocumentInputDocument';
import { Container } from '@/components/Layouts/Container';
import { useRouter } from 'next/router';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { useProfile } from '@/hooks/useProfile';
import DocumentInputStudentDocument from './DocumentInputStudentDocument';
import { Heading } from '@/components/Parts/Text/Heading';

export type DocumentSelected = '' | 'number' | 'document' | 'auto' | 'completed' | 'studentCompleted';

export const Document = () => {
  const [selected, setSelected] = useState<DocumentSelected>('');
  const [mode] = useState<DocumentMode>('document');
  const router = useRouter();
  const { postEventLog } = useEventLog();
  const { profile } = useProfile();

  const loginRedirectUrlKey = 'Login::RedirectURL';

  const routerPushToQuestionaryPage = useCallback(async () => {
    await postEventLog({ name: 'document-complete' });
    router.push('/onboarding/questionary');
  }, [postEventLog, router]);
  const setSelectedWithRedirect = useCallback(
    (value: DocumentSelected) => {
      setSelected(value);
      if (value === 'completed' && localStorage) {
        const savedRedirectUrl = localStorage.getItem(loginRedirectUrlKey);
        if (savedRedirectUrl && savedRedirectUrl !== '' && savedRedirectUrl.toLocaleLowerCase() !== '/top') {
          router.push(savedRedirectUrl);
        } else {
          routerPushToQuestionaryPage();
        }
        localStorage.removeItem(loginRedirectUrlKey);
      }
    },
    [router, routerPushToQuestionaryPage]
  );

  if (!profile) return <></>;

  if (profile.is_invited || profile.is_skip_confirmation_by_utm_source || profile.is_huf_user) {
    router.push('/onboarding/questionary');
    return <></>;
  }

  return (
    <Container className="lg:pb-4">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Heading className="mb-8">ユーザー情報の登録</Heading>
        <div className="lg:w-11/12">
          <RegistrationProgress mode={mode} forStudent={profile.main_speciality === 'STUDENT'} />
        </div>
        {profile.main_speciality === 'STUDENT' ? (
          <DocumentInputStudentDocument selected={selected} setSelected={setSelected} />
        ) : (
          <>
            {selected === '' && <DocumentTypeSelect setSelected={setSelected} />}
            {selected === 'number' && <DoctorNumberForm setSelectedWithRedirect={setSelectedWithRedirect} />}
            {selected === 'document' && <DocumentInputDocument setSelectedWithRedirect={setSelectedWithRedirect} />}
            {selected === 'auto' && <DocumentInputAuto setSelectedWithRedirect={setSelectedWithRedirect} />}
          </>
        )}
      </div>
    </Container>
  );
};
