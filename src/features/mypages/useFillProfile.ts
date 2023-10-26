import { useCallback, useEffect } from 'react';
import { useEditProfile } from './editProfile/useEditProfile';
import { useRouter } from 'next/router';
import { mutateFetchProfile, useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';

type Query = {
  redirect?: string;
};

// 代理登録時の不足しているプロフィールを埋めるページの処理
export const useFillProfile = () => {
  const router = useRouter();
  const { redirect } = router.query as Query;
  const editProfile = useEditProfile({ isRegisterMode: false });
  const { profile, saveProfile } = editProfile;
  const { profile: fetchedProfile } = useFetchProfile();

  const isNeedToInputProfile = fetchedProfile?.birthday_year === 9999;

  useEffect(() => {
    if (!profile) {
      return;
    }

    if (!isNeedToInputProfile) {
      router.push('/top');
    }
  }, [isNeedToInputProfile, profile, router]);

  const submitFillProfile = useCallback(async () => {
    if (!profile) {
      return;
    }

    const result = await saveProfile();
    if (!result) {
      return;
    }

    mutateFetchProfile();
    router.push(redirect ?? '/top');
  }, [profile, redirect, router, saveProfile]);

  return { ...editProfile, submitFillProfile };
};
