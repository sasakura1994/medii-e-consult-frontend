import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { useEffect, useState } from 'react';

export type EditingProfile = Omit<
  ProfileEntity,
  'birthday_year' | 'birthday_month' | 'birthday_day'
> & {
  birthday_year: string;
  birthday_month: string;
  birthday_day: string;
};

export const useEditProfile = () => {
  const [profile, setProfile] = useState<EditingProfile>();
  const [isInitialized, setIsInitialized] = useState(false);

  const { profile: fetchedProfile } = useFetchProfile();

  useEffect(() => {
    if (isInitialized) {
      return;
    }
    if (!fetchedProfile) {
      return;
    }

    setProfile({
      ...fetchedProfile,
      birthday_year:
        fetchedProfile.birthday_year == 0
          ? ''
          : fetchedProfile.birthday_year.toString(),
      birthday_month:
        fetchedProfile.birthday_month == 0
          ? ''
          : fetchedProfile.birthday_month.toString(),
      birthday_day:
        fetchedProfile.birthday_day == 0
          ? ''
          : fetchedProfile.birthday_day.toString(),
    });
    setIsInitialized(true);
  }, [fetchedProfile, isInitialized]);

  return { profile, setProfile };
};
