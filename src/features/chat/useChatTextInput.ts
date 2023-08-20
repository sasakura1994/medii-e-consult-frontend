import { usePostChatMessageNewText } from '@/hooks/api/chat/usePostChatMessageNewText';
import { useRef, useState, useCallback, ChangeEvent, useEffect } from 'react';

export const useChatTextInput = () => {
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
  return {
    postNewMessage,
    editingImage,
    setEditingImage,
    textInputRef,
    imageInputRef,
    resizeHeight,
    onSelectImage,
    resetImageInput,
  };
};
