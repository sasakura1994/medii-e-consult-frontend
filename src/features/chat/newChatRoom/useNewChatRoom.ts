import { NewChatRoomEntity } from '@/types/entities/chat/NewChatRoomEntity';
import React from 'react';

type AgeRange = string | 'child';

export const useNewChatRoom = () => {
  const [mode, setMode] = React.useState<'input' | 'confirm'>('input');
  const [formData, setFormData] = React.useState<NewChatRoomEntity>({
    room_type: 'FREE',
    gender: 'man',
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

  return {
    ageRange,
    childAge,
    formData,
    mode,
    setAgeRange,
    setAgeRangeWrapper,
    setChildAgeWrapper,
    setFormData,
  };
};
