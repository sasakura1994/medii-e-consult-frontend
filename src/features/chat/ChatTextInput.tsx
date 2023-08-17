import ImageEditor, { ImageEditorProps } from '@/components/Parts/ImageEditor/ImageEditor';
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
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [editingImage, setEditingImage] = useState<File>();

  const onSelectImage = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const files = e.target.files;

    if (files[0].type.match(/^image\//)) {
      setEditingImage(files[0]);
      return;
    }
  }, []);

  const resetImageInput = useCallback(() => {
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  }, [imageInputRef]);

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

  useEffect(() => {
    resizeHeight();
  }, []);

  return (
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
            postNewMessage({
              chat_room_id: chatRoomId,
              message: textInputRef.current?.value ?? '',
            });

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            textInputRef.current!.value = '';
            resizeHeight();
          }
        }}
      />
      <input
        type="file"
        name="file"
        ref={imageInputRef}
        className="hidden"
        onChange={onSelectImage}
        onClick={() => resetImageInput()}
      />
      <img
        src="/icons/clip_message.svg"
        alt=""
        className="my-auto ml-3 h-[30px] w-[30px] cursor-pointer"
        onClick={() => imageInputRef.current?.click()}
      />
      <img
        src="/icons/send_message.svg"
        alt=""
        className="my-auto ml-3 h-[30px] w-[30px] cursor-pointer"
        onClick={() => {
          postNewMessage({
            chat_room_id: chatRoomId,
            message: textInputRef.current?.value ?? '',
          });

          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          textInputRef.current!.value = '';
          resizeHeight();
        }}
      />
      {editingImage && (
        <ImageEditorComponent
          file={editingImage}
          onSubmit={() => {
            console.log('submit');
          }}
          onClose={() => setEditingImage(undefined)}
        />
      )}
    </div>
  );
};
