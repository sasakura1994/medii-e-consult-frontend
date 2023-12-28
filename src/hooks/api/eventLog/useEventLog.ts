import { useAxios } from '@/hooks/network/useAxios';
import { useCallback, useEffect, useRef } from 'react';

type Args = {
  name: string;
  parameter?: string;
};

type UseEventLog = {
  postEventLog: (args: Args) => Promise<void>;
};

export const useEventLog = (args?: Args): UseEventLog => {
  const { axios, hasToken } = useAxios();
  const sentCountRef = useRef(0);

  useEffect(() => {
    if (args && hasToken && sentCountRef.current === 0) {
      sentCountRef.current++;
      axios.post('/event-log', args);
    }
  }, [args, axios, hasToken]);

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
