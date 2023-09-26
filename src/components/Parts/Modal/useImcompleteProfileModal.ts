import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useMemo } from 'react';

export const useImcompleteProfileModal = () => {
  const { profile } = useFetchProfile();

  const isModalShown = useMemo(() => {
    if (!profile) {
      // 初期化されてない場合はとりあえず非表示
      return false;
    }

    if (profile.registration_source === 'nmo') {
      return false;
    }

    return profile.status === 'CREATED' || profile.status === 'PROFILE';
  }, [profile]);

  const url = useMemo(() => {
    if (!profile) {
      return '';
    }
    if (profile.status === 'CREATED') {
      return '/editProfile?registerMode=1';
    } else if (profile.main_speciality === '') {
      // 何の条件かわからないので要コメント
      return '/editProfile?registerMode=1';
    } else if (profile.status === 'PROFILE') {
      return '/document';
    }
    return '/EditProfile';
  }, [profile]);

  return { isModalShown, profile, url };
};
