import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useMemo } from 'react';
import { Props } from './ImcompleteProfileModal';

export const useImcompleteProfileModal = ({ allowWaiting = false }: Props) => {
  const { profile } = useFetchProfile();

  const isModalShown = useMemo(() => {
    if (!profile) {
      // 初期化されてない場合はとりあえず非表示
      return false;
    }

    if (!allowWaiting) {
      return profile.status !== 'VERIFIED';
    }

    return profile.is_imperfect_profile || profile.need_to_send_confimation;
  }, [allowWaiting, profile]);

  const url = useMemo(() => {
    if (!profile) {
      return '';
    }
    if (profile.is_imperfect_profile) {
      return '/editProfile?registerMode=1';
    } else if (profile.main_speciality === '') {
      return '/editProfile?registerMode=1';
    } else if (profile.need_to_send_confimation) {
      return '/document';
    }
    return '/EditProfile';
  }, [profile]);

  return { isModalShown, profile, url };
};
