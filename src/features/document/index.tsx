import React, { useEffect, useState } from 'react';
import RegistrationProgress, { DocumentMode } from './RegistrationProgress';
import DocumentTypeSelect from './DocumentTypeSelect';
import DoctorNumberForm from './DoctorNumberForm';
import DocumentInputCompleted from './DocumentInputCompleted';
import DocumentInputAuto from './DocumentInputAuto';
import DocumentInputDocument from './DocumentInputDocument';
import { MyPageMenu } from '@/components/Parts/Menu/MyPageMenu';
import { Container } from '@/components/Layouts/Container';
import { CustomHead } from '@/components/Commons/CustomHead';
import { MyPageLayoutWithoutSpFooterMenu } from '@/components/Layouts/MyPageLayoutWithoutSpFooterMenu';

export type DocumentSelected =
  | ''
  | 'number'
  | 'document'
  | 'auto'
  | 'completed';

export const Document = () => {
  const [selected, setSelected] = useState<DocumentSelected>('');
  const [mode, setMode] = useState<DocumentMode>('document');

  useEffect(() => {
    if (selected === 'completed') {
      setMode('completed');
    }
  }, [selected]);

  if (selected !== 'completed') {
    return (
      <>
        <CustomHead />
        <MyPageLayoutWithoutSpFooterMenu>
          <Container className="mt-4 mb-10">
            <div className="-mt-12">
              <MyPageMenu />
            </div>
            <div className="mt-5 flex h-full w-full flex-col items-center justify-center">
              <h1 className="mb-8 text-2xl font-bold lg:mt-5">
                Medii 会員登録
              </h1>
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
              {selected === 'auto' && (
                <DocumentInputAuto setSelected={setSelected} />
              )}
            </div>
          </Container>
        </MyPageLayoutWithoutSpFooterMenu>
      </>
    );
  }
  return (
    <>
      <CustomHead />
      <Container className="mt-4 mb-10">
        <DocumentInputCompleted isInvited={false} />
      </Container>
    </>
  );
};
