import { useCallback, useEffect, useState } from 'react';
import { useEditProfile } from './editProfile/useEditProfile';
import { useRouter } from 'next/router';
import { mutateFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useProfile } from '@/hooks/useProfile';

type Query = {
  redirect?: string;
};

// 代理登録時の不足しているプロフィールを埋めるページの処理
export const useFillProfile = () => {
  const router = useRouter();
  const { redirect } = router.query as Query;
  const editProfile = useEditProfile({ isRegisterMode: false });
  const { profile, saveProfile } = editProfile;
  const { isNeedToInputProfile } = useProfile();
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!profile || isFinished) {
      return;
    }

    // 完了時にも動いてしまうのでisFinishedでガード
    if (!isNeedToInputProfile) {
      router.push(redirect ?? '/top');
    }
  }, [isFinished, isNeedToInputProfile, profile, redirect, router]);

  const submitFillProfile = useCallback(async () => {
    if (!profile) {
      return;
    }

    const result = await saveProfile();
    if (!result) {
      return;
    }

    setIsFinished(true);
    mutateFetchProfile();
    router.push(redirect ?? '/top');
  }, [profile, redirect, router, saveProfile]);

  return { ...editProfile, submitFillProfile };
};
