import { useAxios } from '@/hooks/network/useAxios';
import React, { useState } from 'react';
import { KeyedMutator } from 'swr';
import { SeminarResponse } from './useFetchSeminar';

export type UseUseTicketType = {
  useTicket: () => Promise<void>;
  isTicketConfirmDialogShown: boolean;
  setIsTicketConfirmDialogShown: React.Dispatch<React.SetStateAction<boolean>>;
  isSendingUsingTicketRequest: boolean;
  setIsSendingUsingTicketRequest: React.Dispatch<React.SetStateAction<boolean>>;
  isTicketNotEnoughDialogShown: boolean;
  setIsTicketNotEnoughDialogShown: React.Dispatch<React.SetStateAction<boolean>>;
};

const endpoint = (id: string ) =>`/seminar/${id}/use_ticket`;

export const useUseTicket= (id: string, mutate: KeyedMutator<SeminarResponse>): UseUseTicketType => {
  const { axios } = useAxios();
  const [ isTicketConfirmDialogShown, setIsTicketConfirmDialogShown] = useState( false );
  const [ isSendingUsingTicketRequest, setIsSendingUsingTicketRequest ] = useState( false );  
  const [isTicketNotEnoughDialogShown, setIsTicketNotEnoughDialogShown] = useState( false );

  const useTicket = React.useCallback(async () =>
  {
    const response = await axios.post<{ movie_url: string; }>(
      endpoint( id ),
    ).catch( ( error ) =>
    {
      console.log( error );
      if ( error.status === -20 )
      {
        setIsTicketNotEnoughDialogShown( true );
      } else
      {
        alert( error.message || 'エラーが発生しました' );
      }
    } );
    if ( response )
    {
      setIsTicketConfirmDialogShown( false );
      setIsSendingUsingTicketRequest( false );
      mutate();
    }
  }, [axios]);

  return { useTicket, isTicketConfirmDialogShown, isSendingUsingTicketRequest, isTicketNotEnoughDialogShown, setIsTicketConfirmDialogShown, setIsSendingUsingTicketRequest, setIsTicketNotEnoughDialogShown};
};
