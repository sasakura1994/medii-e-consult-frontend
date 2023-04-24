import React from 'react';

type ModeType = 'edit' | 'document' | 'completed';

type RegistrationProgressProps = {
  mode: ModeType;
};

const RegistrationProgress: React.FC<RegistrationProgressProps> = ({
  mode,
}) => {
  const getArrowImage = (currentMode: ModeType) => {
    switch (true) {
      case mode === currentMode:
        return '/icons/arrow_right_alt_primary.svg';
      case mode === 'document' && currentMode === 'edit':
        return '/icons/arrow_right_alt.svg';
      default:
        return '/icons/arrow_right_alt_disabled.svg';
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`flex h-14 w-24 items-center justify-center rounded border-2 bg-white
         text-center text-xs font-bold lg:h-12 lg:w-40 lg:text-sm ${
           mode === 'edit'
             ? 'border-primary text-primary'
             : 'border-gray-400 text-gray-400'
         }`}
      >
        プロフィール
        <br className="lg:hidden" />
        登録
      </div>
      <img src={getArrowImage('edit')} className="mx-2 lg:mx-3" />
      <div
        className={`flex h-14 w-24 items-center justify-center rounded border-2 bg-white
        text-center text-xs font-bold lg:h-12 lg:w-40 lg:text-sm ${
          mode === 'document'
            ? 'border-primary text-primary'
            : mode === 'edit'
            ? 'border-gray-300 text-gray-300'
            : 'border-gray-400 text-gray-400'
        }`}
      >
        医師資格確認
      </div>
      <img className="mx-2 lg:mx-3" src={getArrowImage('document')} />
      <div
        className={`flex h-14 w-24 items-center justify-center rounded border-2 bg-white
        text-center text-xs font-bold lg:h-12 lg:w-40 lg:text-sm ${
          mode === 'completed'
            ? 'border-primary text-primary'
            : 'border-gray-300 text-gray-300'
        }`}
      >
        利用開始
      </div>
    </div>
  );
};

export default RegistrationProgress;
