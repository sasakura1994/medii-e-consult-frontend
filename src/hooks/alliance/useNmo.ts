import { useMemo } from 'react';
import { useFetchProfile } from '../api/doctor/useFetchProfile';

type UseNmo = {
  isNeedToInputProfile: boolean;
};

export const useNmo = (): UseNmo => {
  const { profile } = useFetchProfile();

  const isNeedToInputProfile = useMemo(
    () => profile !== undefined && profile.registration_source === 'nmo' && profile.last_name_hira === '',
    [profile]
  );

  return { isNeedToInputProfile };
};
