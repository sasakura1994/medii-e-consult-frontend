import React, { Dispatch, SetStateAction } from 'react';
import { DocumentSelected } from '.';
import { useDocumentInputStudentDocument } from './useDocumentInputStudentDocument';
import Link from 'next/link';
import { YearInput } from '@/components/Parts/Form/YearInput';
import { Heading } from '@/components/Parts/Text/Heading';
import SecondaryButton from '@/components/Button/SecondaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';
import { ColoredImage } from '@/components/Image/ColoredImage';
import { Required } from '@/components/Parts/Form/Required';

type DocumentInputStudentDocumentProps = {
  selected: DocumentSelected;
  setSelected: Dispatch<SetStateAction<DocumentSelected>>;
};

const DocumentInputStudentDocument = ({ selected, setSelected }: DocumentInputStudentDocumentProps) => {
  const {
    eraConverter,
    file,
    fileSelectorRef,
    imageSource,
    onFileSelected,
    openFileSelector,
    errorMessage,
    isValid,
    reset,
    submit,
    year,
    setYear,
  } = useDocumentInputStudentDocument({ selected, setSelected });
  if (selected !== 'studentCompleted') {
    return (
      <form onSubmit={submit} data-testid="document-input-student-document">
        <div className="mt-8 px-4 lg:w-[600px] lg:px-0">
          <div className="mx-2 mb-6 mt-6">
            <Heading as="h2">学生証の確認</Heading>
            <p className="mt-2">所属する大学名と氏名を確認できる学生証をアップロードしてください。</p>
            <div className={`mt-8 flex flex-col gap-2 lg:flex-row lg:gap-6 ${file ? 'items-center' : ''}`}>
              <SecondaryButton type="button" onClick={openFileSelector} className="w-fit">
                画像を選択
              </SecondaryButton>
              {file ? (
                <div className="flex items-center gap-1">
                  <div>{file.name}</div>
                  <a
                    className="block p-[6px]"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      reset();
                    }}
                  >
                    <ColoredImage src="icons/close.svg" color="#16191D" width="11px" height="11px" />
                  </a>
                </div>
              ) : (
                <>
                  <div className="text-text-secondary">
                    {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : <p>画像がアップロードされてません</p>}

                    <p>（.jpg/.jpeg/.png形式でアップロードしてください）</p>
                  </div>
                </>
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

            {imageSource && (
              <div className="mt-8">
                <img src={imageSource} id="accountDocumentImage" className="w-full" alt="" />
              </div>
            )}
            <div className="mt-8 flex items-center gap-2">
              <Heading as="h4">卒業予定年</Heading>
              <Required>必須</Required>
            </div>
            <div className="mt-2">
              <YearInput {...eraConverter} value={year} onChange={setYear} />
            </div>
            <div className="mt-8 flex justify-center gap-2">
              <Link href="/editprofile?registerMode=1">
                <SecondaryButton size="large">戻る</SecondaryButton>
              </Link>
              <PrimaryButton
                type="submit"
                dataTestId="document-input-number-form-submit"
                size="large"
                disabled={!isValid}
              >
                登録を完了する
              </PrimaryButton>
            </div>
          </div>
        </div>
      </form>
    );
  }
  return (
    <div
      className="border-1 rounded-xs -mb-10 mt-10  w-full border bg-white px-2
    lg:mb-0 lg:px-16 lg:pb-6"
    >
      <div className="mb-6 mt-6 text-center">送信完了しました</div>
      <div className="text-center text-text-link">
        <Link href="/top">ホーム画面に戻る</Link>
      </div>
    </div>
  );
};

export default DocumentInputStudentDocument;
