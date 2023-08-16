import { GrayButton } from '@/components/Parts/Button/GrayButton';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import ImageEditor, { ImageEditorProps } from '@/components/Parts/ImageEditor/ImageEditor';
import { Modal } from '@/components/Parts/Modal/Modal';
import { usePostChatMessageNewFiles } from '@/hooks/api/chat/usePostChatMessageNewFiles';
import { usePostChatMessageNewText } from '@/hooks/api/chat/usePostChatMessageNewText';
import dynamic, { DynamicOptions } from 'next/dynamic';
import React, { useRef, useEffect, useState, useCallback, ChangeEvent } from 'react';
// canvasの関係でサーバー時点でimportできないため、下記のようにdynamic importする
const ImageEditorComponent = dynamic<ImageEditorProps>(
  (() => import('@/components/Parts/ImageEditor/ImageEditor')) as DynamicOptions<ImageEditorProps>,
  { ssr: false }
) as typeof ImageEditor;

type ChatTextInputProps = {
  chatRoomId: string;
};

export const ChatTextInput = (props: ChatTextInputProps) => {
  const { chatRoomId } = props;
  const { postNewMessage } = usePostChatMessageNewText();
  const { postNewFile } = usePostChatMessageNewFiles();
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingImage, setEditingImage] = useState<File>();
  const [isOpenFileInputModal, setIsOpenFileInputModal] = useState(false);

  const onSelectFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const files = e.target.files;

    if (files[0].type.match(/^image\//)) {
      setEditingImage(files[0]);
      return;
    } else {
      setIsOpenFileInputModal(true);
    }
  }, []);

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const resizeHeight = () => {
    if (textInputRef.current) {
      textInputRef.current.style.height = '40px';
      textInputRef.current.style.height = `${textInputRef.current.scrollHeight}px`;
      if (textInputRef.current.scrollHeight > 400) {
        textInputRef.current.style.height = '400px';
        textInputRef.current.style.overflowY = 'scroll';
      }
    }
  };

  const postTextMessage = () => {
    if (textInputRef.current) {
      postNewMessage({
        chat_room_id: chatRoomId,
        message: textInputRef.current?.value ?? '',
      });

      textInputRef.current.value = '';
      resizeHeight();
    }
  };

  const postFile = () => {
    if (fileInputRef.current?.files) {
      postNewFile({
        chat_room_id: chatRoomId,
        uploaded_file: fileInputRef.current.files[0],
      });
      resetFileInput();
      setIsOpenFileInputModal(false);
    }
  };

  useEffect(() => {
    resizeHeight();
  }, []);

  return (
    <>
      {isOpenFileInputModal && fileInputRef.current?.files && (
        <Modal className="min-h-[166px] w-[610px] border" isCenter>
          <p className="mt-3 text-center text-l">以下のファイルをアップロードします。よろしいですか。</p>
          <p className="mt-3 text-center">{fileInputRef.current.files[0].name}</p>
          <div className="mt-4 flex justify-center space-x-5">
            <GrayButton
              onClick={() => {
                setIsOpenFileInputModal(false);
                resetFileInput();
              }}
            >
              キャンセル
            </GrayButton>
            <PrimaryButton
              onClick={() => {
                postFile();
              }}
            >
              OK
            </PrimaryButton>
          </div>
        </Modal>
      )}
      <div className="flex w-full bg-white py-1">
        <textarea
          ref={textInputRef}
          onChange={resizeHeight}
          className="ml-2 flex w-[682px] resize-none rounded border border-solid border-block-gray px-2 py-1
          placeholder-gray-600 disabled:bg-[#d5d5d5] disabled:text-block-gray"
          placeholder="メッセージを入力 (Shift + Enterキーで送信)"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              e.preventDefault();
              postTextMessage();
            }
          }}
        />
        <input
          type="file"
          name="file"
          ref={fileInputRef}
          className="hidden"
          onChange={onSelectFile}
          onClick={() => resetFileInput()}
        />
        <img
          src="/icons/clip_message.svg"
          alt=""
          className="my-auto ml-3 h-[30px] w-[30px] cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        />
        <img
          src="/icons/send_message.svg"
          alt=""
          className="my-auto ml-3 h-[30px] w-[30px] cursor-pointer"
          onClick={() => {
            postTextMessage();
          }}
        />
        {editingImage && (
          <ImageEditorComponent
            file={editingImage}
            onSubmit={(file) => {
              postNewFile({
                chat_room_id: chatRoomId,
                uploaded_file: file,
              });

              setEditingImage(undefined);
            }}
            onClose={() => setEditingImage(undefined)}
          />
        )}
      </div>
    </>
  );
};
