import { useAxios } from '@/hooks/network/useAxios';
import { useEffect } from 'react';

type Args = {
  name: string;
};

export const useEventLog = (args: Args) => {
  const { axios } = useAxios();

  useEffect(() => {
    axios.post('/event-log', args);
    // 初期化時のみのため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
