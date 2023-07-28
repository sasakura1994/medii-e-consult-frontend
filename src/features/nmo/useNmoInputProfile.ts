import { useCallback, useEffect } from 'react';
import { UseEditProfile, useEditProfile } from '../mypages/editProfile/useEditProfile';
import { useRouter } from 'next/router';

type Query = {
  redirect?: string;
};

type UseNmoInputProfile = UseEditProfile & {
  submitNmoInputProfile: () => void;
};

export const useNmoInputProfile = (): UseNmoInputProfile => {
  const router = useRouter();
  const { redirect } = router.query as Query;
  const editProfile = useEditProfile({ isRegisterMode: false });
  const { profile, saveProfile } = editProfile;

  useEffect(() => {
    if (!profile) {
      return;
    }

    if (profile.registration_source !== 'nmo' || profile.last_name_hira !== '') {
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

    router.push(redirect ?? '/top');
  }, [profile, redirect, router, saveProfile]);

  return { ...editProfile, submitNmoInputProfile };
};
