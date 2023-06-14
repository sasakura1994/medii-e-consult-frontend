import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { useEffect, useState } from 'react';

export type EditingProfile = Omit<
  ProfileEntity,
  'birthday_year' | 'birthday_month' | 'birthday_day' | 'qualified_year'
> & {
  birthday_year: string;
  birthday_month: string;
  birthday_day: string;
  qualified_year: string;
};

const numberToString = (value: number) => (value === 0 ? '' : value.toString());

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
      birthday_year: numberToString(fetchedProfile.birthday_year),
      birthday_month: numberToString(fetchedProfile.birthday_month),
      birthday_day: numberToString(fetchedProfile.birthday_day),
      qualified_year: numberToString(fetchedProfile.qualified_year),
    });
    setIsInitialized(true);
  }, [fetchedProfile, isInitialized]);

  return { profile, setProfile };
};
