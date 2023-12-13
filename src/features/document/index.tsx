import React from 'react';
import RegistrationProgress from './RegistrationProgress';
import DocumentTypeSelect from './DocumentTypeSelect';
import DoctorNumberForm from './DoctorNumberForm';
import DocumentInputAuto from './DocumentInputAuto';
import DocumentInputDocument from './DocumentInputDocument';
import { Container } from '@/components/Layouts/Container';
import { useRouter } from 'next/router';
import { useProfile } from '@/hooks/useProfile';
import DocumentInputStudentDocument from './DocumentInputStudentDocument';
import { Heading } from '@/components/Parts/Text/Heading';
import { useDocument } from './useDocument';

export type DocumentSelected = '' | 'number' | 'document' | 'auto' | 'completed' | 'studentCompleted';

export const Document = () => {
  const router = useRouter();
  const { profile } = useProfile();
  const { mode, selected, setMode, setSelected, setSelectedWithRedirect } = useDocument();

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
          <DocumentInputStudentDocument
            selected={selected}
            setSelected={(newSelected) => {
              setSelected(newSelected);
              if (newSelected === 'studentCompleted') {
                setMode('completed');
              }
            }}
          />
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
