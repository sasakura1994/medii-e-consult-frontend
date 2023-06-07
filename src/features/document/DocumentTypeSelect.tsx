import React from 'react';
import DocumentTypeSelectButton from './DocumentTypeSelectButton';
import { DocumentSelected } from '.';

type DocumentTypeSelectProps = {
  setSelected: React.Dispatch<React.SetStateAction<DocumentSelected>>;
};

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({
  setSelected,
}) => {
  return (
    <div className="px-6 py-4 lg:px-0">
      <div className="text-center text-2xl font-bold lg:mt-10">
        医師資格確認
      </div>
      <div className="mt-6 text-left lg:px-0">
        Mediiは医師および医学生のみご利用いただけます
      </div>
      <div className="mt-5 ml-5 text-center font-bold lg:mt-10 lg:ml-0 lg:text-left">
        医師資格の確認方法を選択してください
      </div>
      <div className="mt-4 flex justify-center">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="text-center text-sm lg:text-left">
            <DocumentTypeSelectButton
              id={'number'}
              text="医師番号を入力"
              image="/icons/doctor.svg"
              onClick={() => setSelected('number')}
            >
              医師番号・取得年を
              <br className="hidden lg:block" />
              直接入力します
            </DocumentTypeSelectButton>
          </div>
          <div className="text-center text-sm lg:text-left">
            <DocumentTypeSelectButton
              id={'document'}
              text="画像アップロード"
              image="/icons/doctor_id1.svg"
              onClick={() => setSelected('document')}
            >
              医師であることを証明できる画像を
              <br className="hidden lg:block" />
              アップロードします
            </DocumentTypeSelectButton>
          </div>
          <div className="text-center text-sm lg:text-left">
            <DocumentTypeSelectButton
              id={'auto'}
              text="Mediiにおまかせ"
              image="/icons/medii.svg"
              onClick={() => setSelected('auto')}
            >
              入力された情報を元に
              <br className="hidden lg:block" />
              Mediiが医師資格確認を
              <br className="hidden lg:block" />
              行います
            </DocumentTypeSelectButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentTypeSelect;
