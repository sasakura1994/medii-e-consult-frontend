import React from 'react';
import DocumentTypeSelectButton from './DocumentTypeSelectButton';
import { DocumentSelected } from '.';
import Link from 'next/link';
import TertiaryButton from '@/components/Button/TertiaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';

type DocumentTypeSelectProps = {
  setSelected: React.Dispatch<React.SetStateAction<DocumentSelected>>;
};

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ setSelected }) => {
  return (
    <div className="mt-8 px-6 lg:w-[600px] lg:px-0">
      <div className="text-xl font-semibold">医師資格確認</div>
      <div className="mt-2 text-left lg:px-0">Mediiは医師および医学生のみご利用いただけます。</div>
      <div className="mt-6 text-lg font-semibold">医師資格の確認方法を選択してください</div>
      <div className="mt-2 flex justify-center">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          <DocumentTypeSelectButton
            id="number"
            text="医師番号を入力"
            image="icons/doctor.svg"
            onClick={() => setSelected('number')}
          >
            医師番号・取得年を直接入力します
          </DocumentTypeSelectButton>
          <DocumentTypeSelectButton
            id="document"
            text="医師免許の登録"
            image="icons/doctor_id1.svg"
            onClick={() => setSelected('document')}
          >
            医師免許証、所属医療機関のIDカード、医師資格証、専門医証明書などが対象です
          </DocumentTypeSelectButton>
          <DocumentTypeSelectButton
            id="auto"
            text="Mediiにおまかせ"
            image="icons/medii.svg"
            onClick={() => setSelected('auto')}
          >
            入力していただいた内容からMediiが医師資格確認を行います
          </DocumentTypeSelectButton>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <Link href="/top">
          <TertiaryButton size="large" className="lg:px-10">
            あとで登録する
          </TertiaryButton>
        </Link>
      </div>
      <div className="mt-8 flex justify-center">
        <Link href="/editprofile?registerMode=1">
          <SecondaryButton size="large" className="w-[64px]">
            戻る
          </SecondaryButton>
        </Link>
      </div>
    </div>
  );
};

export default DocumentTypeSelect;
