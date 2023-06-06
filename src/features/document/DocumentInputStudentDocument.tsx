import React, { Dispatch, SetStateAction } from 'react';
import { DocumentSelected } from '.';
import { useDocumentInputStudentDocument } from './useDocumentInputStudentDocument';
import { Era } from '@/hooks/useEraConverter';
import Link from 'next/link';

type DocumentInputStudentDocumentProps = {
  selected: DocumentSelected;
  setSelected: Dispatch<SetStateAction<DocumentSelected>>;
};

const DocumentInputStudentDocument = ({
  selected,
  setSelected,
}: DocumentInputStudentDocumentProps) => {
  const {
    imageSource,
    onFileSelected,
    openFileSelector,
    fileSelectorRef,
    errorMessage,
    submit,
    validation,
    handleEraChange,
    inputYear,
    handleInputYearToSeireki,
    handleGraduationYearToJapaneseEraYear,
  } = useDocumentInputStudentDocument({ selected, setSelected });
  if (selected !== 'studentCompleted') {
    return (
      <form onSubmit={submit}>
        <div
          className="border-1 rounded-xs mt-10 -mb-10 w-full border bg-white px-2
         lg:mb-0 lg:w-[644px] lg:px-16 lg:pb-6"
        >
          <div className="mx-2 mt-6 mb-6">
            <div className="relative flex text-left text-2xl font-bold lg:mt-10 lg:text-center">
              <div className="mx-auto">学生証確認</div>
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
              src="/images/document/student.png"
              className="mx-auto mt-6"
              alt=""
            />
            <div className="mt-1 text-center">
              大学名と名前のある面をアップしてください
            </div>
            <div className="mt-1 font-bold">卒業予定年</div>
            <div className="mt-1 flex">
              <select
                required
                className="h-12 w-20 rounded-md border border-gray-400 px-2"
                onChange={(e) => {
                  handleEraChange(e.target.value);
                  handleGraduationYearToJapaneseEraYear(e.target.value as Era);
                }}
              >
                <option value="year">西暦</option>
                <option value="showa">昭和</option>
                <option value="heisei">平成</option>
                <option value="reiwa">令和</option>
              </select>
              <input
                type="number"
                placeholder="-"
                value={inputYear}
                className="ml-2 h-12 w-20 rounded-md border border-gray-400 px-2 lg:w-40"
                required
                min={validation.min}
                max={validation.max}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 4) {
                    handleInputYearToSeireki(value);
                  }
                }}
              />
              <div className="ml-1 mt-5">年</div>
            </div>
            {errorMessage && (
              <div className="mt-5 text-center text-base font-bold text-red-400">
                {errorMessage}
              </div>
            )}
            <div className="mt-4 flex justify-center lg:mb-0 lg:mt-0">
              <input
                type="submit"
                className="mt-10 w-4/5 cursor-pointer rounded-full bg-primary px-10 pt-1.5 pb-2 font-bold
                      text-white shadow-lg"
                value="送信"
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
  return (
    <div
      className="border-1 rounded-xs mt-10 -mb-10  w-full border bg-white px-2
    lg:mb-0 lg:px-16 lg:pb-6"
    >
      <div className="mt-6 mb-6 text-center">送信完了しました</div>
      <div className="text-center text-text-link">
        <Link href="/top">ホーム画面に戻る</Link>
      </div>
    </div>
  );
};

export default DocumentInputStudentDocument;
