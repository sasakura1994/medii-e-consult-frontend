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

  const postEventLog = useCallback(
    async (args: Args) => {
      if (hasToken) {
        await axios.post('/event-log', args);
      }
    },
    [axios, hasToken]
  );

  return {
    postEventLog,
  };
};
