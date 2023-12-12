import React from 'react';

import { useDocumentInputAuto } from './useDocumentInputAuto';
import { DocumentSelected } from '.';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { Heading } from '@/components/Parts/Text/Heading';

type DocumentInputAutoProps = {
  setSelectedWithRedirect: (value: DocumentSelected) => void;
};

const DocumentInputAuto: React.FC<DocumentInputAutoProps> = ({ setSelectedWithRedirect }) => {
  const { errorMessage, submit, getPrefectureNameByCode, hospital, profile } = useDocumentInputAuto({
    setSelectedWithRedirect,
  });
  return (
    <form
      onSubmit={(e) => {
        submit();
        e.preventDefault();
      }}
      data-testid="document-input-auto"
    >
      <div className="mt-8 w-full px-4 lg:mb-0 lg:w-[600px] lg:px-0">
        <Heading as="h2">Mediiにおまかせ</Heading>
        <ul className="mt-2 list-disc pl-6">
          <li>Mediiスタッフが登録情報を元に医師資格確認を行います。医師確認できた場合、ここで完了となります。</li>
          <li>
            万が一確認できなかった場合、「医師免許証の登録」または「医師番号の登録」から再度お手続きをお願いします。
          </li>
        </ul>
        <div className="mt-8 font-bold">勤務先病院名</div>
        <div className="mt-2">{hospital?.hospital_name ?? profile?.hospital_name}</div>
        <div className="mt-6 font-bold">所在地</div>
        <div className="mt-2">{getPrefectureNameByCode(profile?.prefecture_code)}</div>
        <div className="mt-6 font-bold">医師免許取得年</div>
        <div className="mt-2">{profile && profile.qualified_year !== 9999 ? profile.qualified_year : ''}年</div>
      </div>
      {errorMessage && <div className="mt-5 text-center text-base font-bold text-red-400">{errorMessage}</div>}
      <div className="mt-8 flex justify-center gap-2">
        <SecondaryButton onClick={() => setSelectedWithRedirect('')} size="large">
          選択へ戻る
        </SecondaryButton>
        <PrimaryButton type="submit" size="large">
          Mediiにおまかせで登録
        </PrimaryButton>
      </div>
    </form>
  );
};

export default DocumentInputAuto;
