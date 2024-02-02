import React from 'react';
import RegistrationProgress from './RegistrationProgress';
import DocumentTypeSelect from './DocumentTypeSelect';
import DoctorNumberForm from './DoctorNumberForm';
import DocumentInputDocument from './DocumentInputDocument';
import { Container } from '@/components/Layouts/Container';
import { useRouter } from 'next/router';
import DocumentInputStudentDocument from './DocumentInputStudentDocument';
import { Heading } from '@/components/Parts/Text/Heading';
import { useDocument } from './useDocument';

export type DocumentSelected = '' | 'number' | 'document' | 'completed' | 'studentCompleted';

export const Document = () => {
  const router = useRouter();
  const { isOnboardingQuestionaryIsNotNeeded, mode, profile, selected, setMode, setSelected, setSelectedWithRedirect } =
    useDocument();

  if (!profile) return <></>;

  if (profile.is_skip_confirmation_by_utm_source || profile.is_huf_user) {
    router.push(isOnboardingQuestionaryIsNotNeeded ? '/top' : '/onboarding/questionary');
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
          </>
        )}
      </div>
    </Container>
  );
};
