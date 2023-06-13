import { useAxios } from '@/hooks/network/useAxios';
import { useCallback, useEffect, useState } from 'react';

type Args = {
  name: string;
};

type UseEventLog = {
  postEventLog: (args: Args) => Promise<void>;
};

export const useEventLog = (args?: Args): UseEventLog => {
  const { axios, hasToken } = useAxios();
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (args && hasToken && !isSent) {
      setIsSent(true);
      axios.post('/event-log', args);
    }
  }, [args, axios, hasToken, isSent]);

  const postEventLog = useCallback(
    async (postArgs: Args) => {
      if (hasToken) {
        await axios.post('/event-log', postArgs);
      }
    },
    [axios, hasToken]
  );

  return { postEventLog };
};
