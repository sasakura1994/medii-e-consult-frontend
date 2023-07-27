import { useCallback, useEffect } from 'react';
import { UseEditProfile, useEditProfile } from '../editProfile/useEditProfile';
import { useRouter } from 'next/router';

type UseNmoInputProfile = UseEditProfile & {
  submitNmoInputProfile: () => void;
};

export const useNmoInputProfile = (): UseNmoInputProfile => {
  const router = useRouter();
  const editProfile = useEditProfile({ isRegisterMode: false });
  const { profile, saveProfile } = editProfile;

  useEffect(() => {
    if (!profile) {
      return;
    }

    if (profile.registration_source !== 'nmo') {
      router.push('/top');
    }
    // profileが有効になった場合のみのチェックを行うため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!profile]);

  const submitNmoInputProfile = useCallback(async () => {
    if (!profile) {
      return;
    }

    const result = await saveProfile();
    if (!result) {
      return;
    }

    router.push('/top');
  }, [profile, router, saveProfile]);

  return { ...editProfile, submitNmoInputProfile };
};
