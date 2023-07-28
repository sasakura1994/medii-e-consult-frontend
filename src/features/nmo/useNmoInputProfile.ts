import { useCallback, useEffect } from 'react';
import { UseEditProfile, useEditProfile } from '../mypages/editProfile/useEditProfile';
import { useRouter } from 'next/router';
import { useNmo } from '@/hooks/alliance/useNmo';

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
  const { isNeedToInputProfile } = useNmo();

  useEffect(() => {
    if (!profile) {
      return;
    }

    if (!isNeedToInputProfile) {
      router.push('/top');
    }
  }, [isNeedToInputProfile, profile, router]);

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
