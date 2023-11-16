import React from 'react';
import { useDocumentInputDocument } from './useDocumentInputDocument';
import { DocumentSelected } from '.';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { ColoredImage } from '@/components/Image/ColoredImage';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';
import { Heading } from '@/components/Parts/Text/Heading';

type DocumentInputDocumentProps = {
  setSelectedWithRedirect: (value: DocumentSelected) => void;
};

const DocumentInputDocument = ({ setSelectedWithRedirect }: DocumentInputDocumentProps) => {
  const { file, imageSource, onFileSelected, openFileSelector, fileSelectorRef, errorMessage, reset, submit } =
    useDocumentInputDocument({ setSelectedWithRedirect });

  return (
    <form onSubmit={submit} data-testid="document-input-document">
      <div className="mt-8 px-4 lg:w-[600px] lg:px-0">
        <Heading as="h2">医師免許証を登録</Heading>
        <div className="mt-2">
          医師であることを証明できる画像をアップロードしてください
          <br />
          医師免許証、所属医療機関のIDカード、医師資格証、専門医証明書などが対象です
          <br />
          ※氏名・交付年月日などが記載された面をアップロードしてください
        </div>
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
        <div className="mt-6">
          {imageSource === '' ? (
            <div className="rounded border border-border-divider p-4">
              <div className="mb-2 text-text-secondary">＜画像例＞</div>
              <img src="images/document/license_sample.png" className="max-w-full" alt="画像例" />
            </div>
          ) : (
            <img src={imageSource} id="accountDocumentImage" className="w-full" alt="" />
          )}
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-2">
        <SecondaryButton onClick={() => setSelectedWithRedirect('')} size="large">
          選択へ戻る
        </SecondaryButton>
        <PrimaryButton
          type="submit"
          dataTestId="document-input-number-form-submit"
          size="large"
          disabled={imageSource ? false : true}
        >
          登録を完了する
        </PrimaryButton>
      </div>
    </form>
  );
};

export default DocumentInputDocument;
