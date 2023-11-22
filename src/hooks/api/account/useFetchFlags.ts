import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { mutate } from 'swr';

type FlagKey = 'FirstConsultCampaign' | 'OnboardingAnswered' | 'HasConsulted';

type ResponseData = {
  flags: {
    key: FlagKey;
    flag: boolean;
  }[];
};

const generateKey = (key: FlagKey) => `/general/flags?key=${key}`;

export const mutateFetchFlag = (key: FlagKey) => mutate(generateKey(key));

export const useFetchFlag = (key: FlagKey) => {
  const { data, isLoading } = useAuthenticatedSWR<ResponseData>(generateKey(key));

  return {
    flag: data?.flags.find((row) => row.key === key)?.flag,
    isLoading,
  };
};
