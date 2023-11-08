import React from 'react';
import { RegistrationProgressNumber } from './RegistrationProgressNumber';
import { RegistrationProgressLine } from './RegistrationProgressLine';
import { RegistrationProgressLabel } from './RegistrationProgressLabel';

export type DocumentMode = 'edit' | 'document' | 'completed';

type RegistrationProgressProps = {
  mode: DocumentMode;
};

const RegistrationProgress: React.FC<RegistrationProgressProps> = ({ mode }) => {
  return (
    <>
      <div className="flex items-center justify-center">
        <RegistrationProgressNumber>1</RegistrationProgressNumber>
        <RegistrationProgressLine disabled={mode === 'edit'} />
        <RegistrationProgressNumber disabled={mode === 'edit'}>2</RegistrationProgressNumber>
        <RegistrationProgressLine disabled={mode !== 'completed'} />
        <RegistrationProgressNumber disabled={mode !== 'completed'}>3</RegistrationProgressNumber>
      </div>
      <div className="mt-1 flex items-start justify-center lg:gap-4">
        <RegistrationProgressLabel>
          プロフィール
          <br className="lg:hidden" />
          登録
        </RegistrationProgressLabel>
        <RegistrationProgressLabel disabled={mode === 'edit'}>医師資格確認</RegistrationProgressLabel>
        <RegistrationProgressLabel disabled={mode !== 'completed'}>完了</RegistrationProgressLabel>
      </div>
    </>
  );
};

export default RegistrationProgress;
