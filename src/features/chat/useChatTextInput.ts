import { usePostChatMessageNewFiles } from '@/hooks/api/chat/usePostChatMessageNewFiles';
import { usePostChatMessageNewText } from '@/hooks/api/chat/usePostChatMessageNewText';
import { loadLocalStorage, saveLocalStorage } from '@/libs/LocalStorageManager';
import { useRef, useState, useCallback, ChangeEvent, useEffect } from 'react';

type UseChatTextInputProps = {
  chatRoomId: string;
  fetchNewChatList: (uid: number) => void;
};

export const useChatTextInput = (props: UseChatTextInputProps) => {
  const { chatRoomId, fetchNewChatList } = props;
  const { postNewMessage } = usePostChatMessageNewText();
  const { postNewFile } = usePostChatMessageNewFiles();
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpenFileInputModal, setIsOpenFileInputModal] = useState(false);
  const [editingImage, setEditingImage] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const onSelectFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const files = e.target.files;

    if (files[0].type.match(/^image\//)) {
      setEditingImage(files[0]);
      return;
    }
    setIsOpenFileInputModal(true);
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

  const postTextMessage = async () => {
    if (textInputRef.current && textInputRef.current.value) {
      await postNewMessage({
        chat_room_id: chatRoomId,
        message: textInputRef.current.value,
      });
      fetchNewChatList(0);
      textInputRef.current.value = '';
      resizeHeight();
    }
  };

  const postFile = async () => {
    if (fileInputRef.current?.files) {
      setIsUploading(true);
      await postNewFile({
        chat_room_id: chatRoomId,
        uploaded_file: fileInputRef.current.files[0],
      });
      setIsUploading(false);
      resetFileInput();
      setIsOpenFileInputModal(false);
    }
  };
  const updateDraftMessage = (value: string) => {
    const currentDrafts = JSON.parse(loadLocalStorage('ChatDraft::List') || '{}');
    if (!value) {
      delete currentDrafts[chatRoomId];
    } else {
      currentDrafts[chatRoomId] = value;
    }
    saveLocalStorage('ChatDraft::List', JSON.stringify(currentDrafts));
  };
  useEffect(() => {
    resizeHeight();
  }, []);

  // ローカルストレージから下書きを取得する
  useEffect(() => {
    const currentDrafts = JSON.parse(loadLocalStorage('ChatDraft::List') || '{}');
    if (textInputRef.current && currentDrafts[chatRoomId]) {
      textInputRef.current.value = currentDrafts[chatRoomId];
      resizeHeight();
      return;
    }
    textInputRef.current!.value = '';
    resizeHeight();
  }, [chatRoomId]);

  // ブレイクポイントを取得する
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
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
    updateDraftMessage,
    windowWidth,
  };
};
