import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';

type Query = {
  registerMode: string;
};

type EditProfileMode = 'profile' | 'edit';

export const useEditProfilePage = () => {
  const router = useRouter();
  const query = router.query as Query;
  const [selectedEditProfileMode, setSelectedEditProfileMode] = useState<EditProfileMode>('profile');

  const isRegisterMode = query.registerMode !== undefined;
  const editProfileMode = isRegisterMode ? 'edit' : selectedEditProfileMode;

  return { editProfileMode, isRegisterMode, setSelectedEditProfileMode };
};
