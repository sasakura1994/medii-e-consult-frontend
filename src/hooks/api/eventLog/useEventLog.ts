import { useAxios } from '@/hooks/network/useAxios';
import { useCallback, useState } from 'react';

type EventLog = {
  postEventLog: (args: Args) => Promise<void>;
};

type Args = {
  name: string;
};

export const useEventLog = (): EventLog => {
  const { axios, hasToken } = useAxios();
  const [isSent, setIsSent] = useState(false);

  const postEventLog = useCallback(
    async (args: Args) => {
      if (hasToken && !isSent) {
        setIsSent(true);
        await axios.post('/event-log', args);
      }
    },
    [axios, hasToken, isSent]
  );

  return {
    postEventLog,
  };
};
