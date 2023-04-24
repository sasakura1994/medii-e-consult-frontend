import React from 'react';
import RegistrationProgress from './RegistrationProgress';
import DocumentTypeSelect from './DocumentTypeSelect';

export const Document = () => {
  return (
    <div className="mt-5 flex h-full w-full flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl font-bold lg:mt-5">Medii 会員登録</h1>
      <div className="lg:w-11/12">
        <RegistrationProgress mode="document" />
      </div>
      <div className="border-1 rounded-xs mt-10 -mb-10 border bg-white lg:mb-0 lg:px-16 lg:pb-6">
        <DocumentTypeSelect
          onSelect={() => {
            console.log('onSelect');
          }}
        />
      </div>
    </div>
  );
};
