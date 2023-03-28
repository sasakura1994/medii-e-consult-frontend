import { NewChatRoomEntity } from '@/types/entities/chat/NewChatRoomEntity';
import React from 'react';

type AgeRange = string | 'child';

export const useNewChatRoom = () => {
  const [mode, setMode] = React.useState<'input' | 'confirm'>('input');
  const [formData, setFormData] = React.useState<NewChatRoomEntity>({
    room_type: 'FREE',
    gender: 'man',
    disease_name: '',
    first_message: '',
    publishment_accepted: true,
  });
  const [ageRange, setAgeRange] = React.useState<AgeRange>('');
  const [childAge, setChildAge] = React.useState<string>('');

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

  return {
    ageRange,
    childAge,
    formData,
    mode,
    selectConsultMessageTemplate,
    setAgeRange,
    setAgeRangeWrapper,
    setChildAgeWrapper,
    setFormData,
  };
};
