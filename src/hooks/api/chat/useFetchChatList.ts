import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { useState, useEffect, useCallback } from 'react';

export type ChatData = {
  account_id: string;
  chat_message_id: string;
  content_type: string;
  created_date: string;
  deleted: boolean;
  file_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  message: string;
  modified: number;
  uid: number;
  read_count: number;
};

export type FetchChatListResponseData = ChatData[];

export const useFetchChatList = (chatRoomId?: string) => {
  const [fromUid, setFromUid] = useState<number | undefined>(undefined);
  const url =
    fromUid && chatRoomId
      ? `/chat_message/chat_list?chat_room_id=${chatRoomId}&from_uid=${fromUid}`
      : chatRoomId
      ? `/chat_message/chat_list?chat_room_id=${chatRoomId}`
      : null;
  const { error, data: newData, mutate } = useAuthenticatedSWR<FetchChatListResponseData>(url);
  const [data, setData] = useState<FetchChatListResponseData | undefined>(undefined);

  const fetchNewChatList = useCallback(
    (uid: number) => {
      if (newData && newData.length >= 100) {
        setFromUid(uid);
        return;
      }
    },
    [newData]
  );

  useEffect(() => {
    // chatRoomIdが変わるたびにリセット
    setData(undefined);
    setFromUid(undefined);
  }, [chatRoomId]);

  useEffect(() => {
    if (newData) {
      // 既存のデータに新しいデータを追加
      setData((prevData) => {
        if (!prevData) {
          return newData;
        }
        const uniqueData = newData.filter(
          (newItem) => !prevData.some((existingItem) => existingItem.uid === newItem.uid)
        );
        return [...uniqueData, ...prevData];
      });
    }
  }, [newData]);

  return {
    error,
    mutate,
    data,
    fetchNewChatList,
  };
};
