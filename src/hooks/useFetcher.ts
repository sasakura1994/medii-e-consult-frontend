import { useAxios } from './useAxios';

export type UseFetcherType = {
  fetcher: (url: string) => unknown;
};

export const useFetcher = (): UseFetcherType => {
  const { axios } = useAxios();

  const fetcher = async (url: string) => {
    const { data } = await axios.get(url);
    return data;
  };

  return {
    fetcher,
  };
};
