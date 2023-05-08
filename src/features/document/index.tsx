import React, { useEffect, useState } from 'react';
import RegistrationProgress from './RegistrationProgress';
import DocumentTypeSelect from './DocumentTypeSelect';
import DoctorNumberForm from './DoctorNumberForm';
import DocumentInputCompleted from './DocumentInputCompleted';
import DocumentInputAuto from './DocumentInputAuto';
import DocumentInputDocument from './DocumentInputDocument';

export const Document = () => {
  const [selected, setSelected] = useState<
    'number' | 'document' | 'auto' | 'completed' | ''
  >('');
  const [mode, setMode] = useState<'edit' | 'document' | 'completed'>(
    'document'
  );

  useEffect(() => {
    if (selected === 'completed') {
      setMode('completed');
    }
  }, [selected]);

  return (
    <div className="mt-5 flex h-full w-full flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-bold lg:mt-5">Medii 会員登録</h1>
      <div className="lg:w-11/12">
        <RegistrationProgress mode={mode} />
      </div>
      {selected === '' && (
        <div className="border-1 rounded-xs mt-10 -mb-10 w-full border bg-white lg:mb-0 lg:px-16 lg:pb-6">
          <DocumentTypeSelect setSelected={setSelected} />
        </div>
      )}
      {selected === 'number' && <DoctorNumberForm setSelected={setSelected} />}
      {selected === 'document' && (
        <DocumentInputDocument setSelected={setSelected} />
      )}
      {selected === 'completed' && <DocumentInputCompleted isInvited={false} />}
      {selected === 'auto' && <DocumentInputAuto setSelected={setSelected} />}
    </div>
  );
};
