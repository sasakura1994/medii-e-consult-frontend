import { GrayButton } from '@/components/Parts/Button/GrayButton';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import ImageEditor, { ImageEditorProps } from '@/components/Parts/ImageEditor/ImageEditor';
import dynamic, { DynamicOptions } from 'next/dynamic';
import React from 'react';
import { useChatTextInput } from './useChatTextInput';
import { Modal } from '@/components/Parts/Modal/Modal';
import RectSpinnerDialog from './RectSpinnerDialog';
import { FetchChatListResponseData } from '@/hooks/api/chat/useFetchChatList';
import { mutateFetchUnreadCounts } from '@/hooks/api/chat/useFetchUnreadCounts';
import { KeyedMutator } from 'swr';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';

// canvasの関係でサーバー時点でimportできないため、下記のようにdynamic importする
const ImageEditorComponent = dynamic<ImageEditorProps>(
  (() => import('@/components/Parts/ImageEditor/ImageEditor')) as DynamicOptions<ImageEditorProps>,
  { ssr: false }
) as typeof ImageEditor;

type ChatTextInputProps = {
  chatRoomId: string;
  mutateChatList?: KeyedMutator<FetchChatListResponseData>;
  mutateChatRoom?: KeyedMutator<FetchChatRoomResponseData>;
};

export const ChatTextInput = (props: ChatTextInputProps) => {
  const { chatRoomId, mutateChatList, mutateChatRoom } = props;
  const {
    isOpenFileInputModal,
    setIsOpenFileInputModal,
    editingImage,
    setEditingImage,
    textInputRef,
    fileInputRef,
    resizeHeight,
    onSelectFile,
    postTextMessage,
    postFile,
    isUploading,
    setIsUploading,
    resetFileInput,
    postNewFile,
  } = useChatTextInput({ chatRoomId: chatRoomId });

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
      {isUploading && <RectSpinnerDialog />}
      <div className="flex w-full bg-white py-1">
        <textarea
          ref={textInputRef}
          onChange={resizeHeight}
          className="ml-2 flex w-[682px] resize-none rounded border border-solid border-block-gray px-2 py-1
          placeholder-gray-600 disabled:bg-[#d5d5d5] disabled:text-block-gray"
          placeholder="メッセージを入力 (Shift + Enterキーで送信)"
          onKeyDown={async (e) => {
            if (e.key === 'Enter' && e.shiftKey) {
              e.preventDefault();
              await postTextMessage();
              mutateChatList?.();
              mutateChatRoom?.();
              mutateFetchUnreadCounts?.();
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
          src="icons/clip_message.svg"
          alt=""
          className="my-auto ml-3 h-[30px] w-[30px] cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        />
        <img
          src="icons/send_message.svg"
          alt=""
          className="my-auto ml-3 h-[30px] w-[30px] cursor-pointer"
          onClick={async () => {
            await postTextMessage();
            mutateChatList?.();
            mutateChatRoom?.();
            mutateFetchUnreadCounts?.();
          }}
        />
        {editingImage && (
          <ImageEditorComponent
            file={editingImage}
            onSubmit={async (file) => {
              setEditingImage(undefined);
              setIsUploading(true);
              await postNewFile({
                chat_room_id: chatRoomId,
                uploaded_file: file,
              });
              setIsUploading(false);
            }}
            onClose={() => setEditingImage(undefined)}
          />
        )}
      </div>
    </>
  );
};
