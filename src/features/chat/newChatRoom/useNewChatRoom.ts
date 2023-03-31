import {
  PostChatRoomResponseData,
  usePostChatRoom,
} from '@/hooks/api/chat/usePostChatRoom';
import { NewChatRoomEntity } from '@/types/entities/chat/NewChatRoomEntity';
import React from 'react';

type AgeRange = string | 'child';
type Mode = 'input' | 'confirm';

export const useNewChatRoom = () => {
  const [mode, setMode] = React.useState<Mode>('input');
  const [formData, setFormData] = React.useState<NewChatRoomEntity>({
    room_type: 'FREE',
    gender: 'man',
    disease_name: '',
    first_message: '',
    publishment_accepted: true,
  });
  const [ageRange, setAgeRange] = React.useState<AgeRange>('');
  const [childAge, setChildAge] = React.useState<string>('');
  const [editingImage, setEditingImage] = React.useState<File>();
  const [isSending, setIsSending] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const { createNewChatRoom } = usePostChatRoom();
  const imageInput = React.useRef<HTMLInputElement>(null);

  const setAgeRangeWrapper = React.useCallback(
    (age: AgeRange) => {
      setAgeRange(age);

      if (age === 'child') {
        setChildAge('');
        setFormData({ ...formData, age: undefined });
      } else {
        setFormData({ ...formData, age: Number(age) });
      }
    },
    [formData]
  );

  const setChildAgeWrapper = React.useCallback(
    (age: string) => {
      setChildAge(age);
      setFormData({ ...formData, age: Number(age) });
    },
    [formData]
  );

  const selectConsultMessageTemplate = React.useCallback(
    (firstMessage: string) => {
      if (
        formData.first_message.trim() !== '' &&
        !confirm(
          'コンサル文にテンプレートを反映します。現在書かれている内容は消えてしまいますがよろしいですか？'
        )
      ) {
        return;
      }

      setFormData((formData) => ({ ...formData, first_message: firstMessage }));
    },
    [formData.first_message]
  );

  const setModeAndScrollToTop = React.useCallback((mode: Mode) => {
    setMode(mode);
    window.scrollTo(0, 0);
  }, []);

  const confirmInput = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setModeAndScrollToTop('confirm');
    },
    [formData]
  );

  const backToInput = React.useCallback(() => {
    setModeAndScrollToTop('input');
  }, []);

  const submit = React.useCallback(async () => {
    setIsSending(true);
    setErrorMessage('');

    // if (this.reConsultChatRoom) {
    //   formData.re_consult_chat_room_id = this.reConsultChatRoom.chat_room_id
    //   formData.re_consult_file_chat_message_ids =
    //     this.reConsultFileMessages.map((chatMessage) => chatMessage.uid)
    // }

    // formData.target_specialities = formData.target_specialities.map(
    //   (medicalSpeciality) => medicalSpeciality.speciality_code
    // )

    const response = await createNewChatRoom({
      ...formData,
      chat_draft_image_ids: [],
      target_specialities: [],
    }).catch((error) => {
      console.error(error);
      setErrorMessage(
        (error.response.data as PostChatRoomResponseData).message
      );
      return null;
    });

    if (!response) {
      setIsSending(false);
      setModeAndScrollToTop('input');
      return;
    }

    if (response.data.code !== 1) {
      setIsSending(false);
      setErrorMessage(response.data.message);
      setModeAndScrollToTop('input');
      return;
    }
  }, [formData]);

  const resetImageInput = React.useCallback(() => {
    if (imageInput.current) {
      imageInput.current.value = '';
    }
  }, [imageInput]);

  const onSelectImage = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }

      const files = e.target.files;

      if (files[0].type.match(/^image\//)) {
        setEditingImage(files[0]);
        return;
      }

      // await this.addImage(files[0])
    },
    []
  );

  return {
    ageRange,
    backToInput,
    childAge,
    confirmInput,
    editingImage,
    errorMessage,
    formData,
    imageInput,
    isSending,
    mode,
    onSelectImage,
    resetImageInput,
    selectConsultMessageTemplate,
    setAgeRange,
    setAgeRangeWrapper,
    setChildAgeWrapper,
    setEditingImage,
    setFormData,
    submit,
  };
};
