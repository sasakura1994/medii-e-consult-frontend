import React, { useState, useRef, useEffect } from 'react';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useUploadDocument } from '@/hooks/api/doctor/useUploadDocument';

type DocumentInputDocumentProps = {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const DocumentInputDocument: React.FC<DocumentInputDocumentProps> = ({
  setSelected,
}) => {
  const { profile } = useFetchProfile();
  const [imageSource, setImageSource] = useState('');
  const { uploadDocument } = useUploadDocument();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const fileSelectorRef = useRef<HTMLInputElement>(null);

  const openFileSelector = () => {
    fileSelectorRef.current?.click();
  };

  useEffect(() => {
    if (profile) {
      setImageSource(profile.document_file_path);
    }
  }, [profile]);

  const selectedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSource(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    if (fileSelectorRef.current?.files?.[0]) {
      if (!imageSource) {
        return;
      }
      setIsSent(false);
      const newProfile = Object.assign({}, profile);
      newProfile.document = fileSelectorRef.current?.files?.[0] || undefined;
      uploadDocument(newProfile).then(() => {
        setIsSent(true);
      });
    } else {
      setErrorMessage('ファイルの種類が不正です');
    }
  };

  useEffect(() => {
    if (isSent) {
      setSelected('completed');
      setIsSent(false);
    }
  }, [isSent, setSelected]);

  return (
    <form onSubmit={submit}>
      <div className="border-1 rounded-xs mt-10 -mb-10 w-full border bg-white px-2 lg:mb-0 lg:px-16 lg:pb-6">
        <div className="mx-2 mt-6 mb-6">
          <div className="relative flex text-left text-2xl font-bold lg:mt-10 lg:text-center">
            <div className="hidden cursor-pointer lg:block">
              <img
                src="/icons/arrow_left.svg"
                className="mt-1.5 h-3 w-3"
                alt=""
              />
              <div
                className="absolute top-0 left-0 pl-4 text-base"
                onClick={() => {
                  setSelected('');
                }}
              >
                選択へ戻る
              </div>
            </div>
            <div className="mx-auto">医師免許証の登録</div>
          </div>
          <div className="mt-10 text-center lg:px-0">
            医師免許証画像をアップロードしてください
          </div>

          <div className="mt-2 ml-4 text-left text-sm">
            ※氏名・交付年月日などが記載された、表面をアップロードしてください
          </div>

          <div
            onClick={openFileSelector}
            className="mt-10 cursor-pointer rounded-md border border-dashed px-6 py-6
             text-center font-bold text-gray-700"
          >
            {imageSource === '' ? (
              'クリックして画像ファイル選択'
            ) : (
              <img
                src={imageSource}
                id="accountDocumentImage"
                className="w-full"
                alt=""
              />
            )}
          </div>
          <input
            ref={fileSelectorRef}
            onChange={selectedFile}
            accept="image/*"
            type="file"
            name="file"
            className="hidden"
          />
          <img
            src="/images/document/license_sample.png"
            className="mt-6 max-w-full"
            alt=""
          />
          <div className="mt-1 text-center">＜画像例＞</div>
        </div>
      </div>
      {errorMessage && (
        <div className="mt-5 text-center text-base font-bold text-red-400">
          {errorMessage}
        </div>
      )}
      <div className="mt-7 flex justify-center lg:mt-0">
        <input
          type="submit"
          className={
            imageSource
              ? ' my-10 cursor-pointer rounded-full bg-primary px-10 pt-1.5 pb-2 font-bold text-white shadow-lg'
              : ' my-10 cursor-pointer rounded-full bg-btn-gray px-10 pt-1.5 pb-2 font-bold text-white shadow-lg'
          }
          value="登録を完了する"
        />
      </div>
    </form>
  );
};

export default DocumentInputDocument;
