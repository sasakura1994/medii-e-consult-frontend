import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

type Query = {
  registerMode: string;
};

type EditProfileMode = 'profile' | 'edit';

type UseEditProfilePage = {
  editProfileMode: EditProfileMode;
  isRegisterMode: boolean;
  profile?: ProfileEntity;
  setSelectedEditProfileMode: Dispatch<SetStateAction<EditProfileMode>>;
};

export const useEditProfilePage = (): UseEditProfilePage => {
  const router = useRouter();
  const query = router.query as Query;
  const [selectedEditProfileMode, setSelectedEditProfileMode] = useState<EditProfileMode>('profile');

  const { profile } = useFetchProfile();

  const isRegisterMode = query.registerMode !== undefined;

  const editProfileMode = useMemo((): EditProfileMode => {
    if (isRegisterMode) {
      return 'edit';
    }

    if (
      profile &&
      ((profile.status !== 'VERIFIED' && !profile.status.startsWith('PENDING')) || profile.last_name === '')
    ) {
      return 'edit';
    }

    return selectedEditProfileMode;
  }, [isRegisterMode, profile, selectedEditProfileMode]);

  return { editProfileMode, isRegisterMode, profile, setSelectedEditProfileMode };
};
