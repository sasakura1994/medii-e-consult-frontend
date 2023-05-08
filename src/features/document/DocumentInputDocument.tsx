import React from 'react';
import { useDocumentInputDocument } from './useDocumentInputDocument';

type DocumentInputDocumentProps = {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const DocumentInputDocument = ({ setSelected }: DocumentInputDocumentProps) => {
  const {
    imageSource,
    onFileSelected,
    openFileSelector,
    fileSelectorRef,
    errorMessage,
    submit,
  } = useDocumentInputDocument({ setSelected });

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
            onChange={onFileSelected}
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