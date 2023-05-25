import { useAxios } from '@/hooks/network/useAxios';
import { useEffect, useState } from 'react';

type Args = {
  name: string;
};

export const useEventLog = (args: Args) => {
  const { axios, hasToken } = useAxios();
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (hasToken && !isSent) {
      setIsSent(true);
      axios.post('/event-log', args);
    }
  }, [args, axios, hasToken, isSent]);
};
