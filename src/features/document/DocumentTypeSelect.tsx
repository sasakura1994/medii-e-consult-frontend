import React from 'react';
import DocumentTypeSelectButton from './DocumentTypeSelectButton';

type DocumentTypeSelectProps = {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({
  setSelected,
}) => {
  return (
    <div className="mt-6 mb-6">
      <div className="text-center text-2xl font-bold lg:mt-10">
        医師資格確認
      </div>
      <div className="mt-10 px-6 text-left lg:px-0">
        Mediiは医師および医学生のみご利用いただけます
      </div>
      <div className="mt-5 ml-5 text-center font-bold lg:mt-10 lg:ml-0 lg:text-left">
        医師資格の確認方法を選択してください
      </div>
      <div className="mt-4 flex justify-center">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="text-center text-sm lg:text-left">
            <DocumentTypeSelectButton
              text="医師番号を入力"
              image="/icons/doctor.svg"
              onClick={() => setSelected('number')}
            >
              医師番号・取得年を直接入力します
            </DocumentTypeSelectButton>
          </div>
          <div className="text-center text-sm lg:text-left">
            <DocumentTypeSelectButton
              text="医師免許証の登録"
              image="/icons/doctor_id1.svg"
              onClick={() => setSelected('document')}
            >
              医師免許証画像をアップロードします
            </DocumentTypeSelectButton>
          </div>
          <div className="text-center text-sm  lg:text-left">
            <DocumentTypeSelectButton
              text="Mediiにおまかせ"
              image="/icons/medii.svg"
              onClick={() => setSelected('auto')}
            >
              入力された情報を元にMediiが医師資格確認を行います
            </DocumentTypeSelectButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentTypeSelect;
