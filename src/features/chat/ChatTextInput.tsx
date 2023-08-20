import ImageEditor, { ImageEditorProps } from '@/components/Parts/ImageEditor/ImageEditor';
import dynamic, { DynamicOptions } from 'next/dynamic';
import React from 'react';
import { useChatTextInput } from './useChatTextInput';
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
  const {
    postNewMessage,
    editingImage,
    setEditingImage,
    textInputRef,
    imageInputRef,
    resizeHeight,
    onSelectImage,
    resetImageInput,
  } = useChatTextInput();

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
