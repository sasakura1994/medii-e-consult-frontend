import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useRouter } from 'next/router';

type Query = {
  registerMode: string;
};

type UseEditProfilePage = {
  isRegisterMode: boolean;
};

export const useEditProfilePage = (): UseEditProfilePage => {
  const router = useRouter();
  const query = router.query as Query;

  const isRegisterMode = query.registerMode !== undefined;

  return { isRegisterMode };
};
