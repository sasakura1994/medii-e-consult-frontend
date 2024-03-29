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
  only_me: boolean;
  is_first: boolean;
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

  const resetFromUid = useCallback(() => {
    setFromUid(undefined);
  }, []);

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
        return [...uniqueData, ...prevData].sort((a, b) => a.uid - b.uid);
      });
    }
  }, [newData]);

  const updateMessageMutate = useCallback((uid: number, message: ChatData) => {
    setData((prevData) => {
      if (!prevData) {
        return undefined;
      }
      return prevData.map((item) => (item.uid === uid ? message : item));
    });
  }, []);

  const deleteMessageMutate = useCallback((uid: number) => {
    setData((prevData) => {
      if (!prevData) {
        return undefined;
      }
      const updatedData = prevData.map((item) => (item.uid === uid ? { ...item, deleted: true } : item));
      return updatedData;
    });
  }, []);

  return {
    error,
    mutate,
    data,
    fetchNewChatList,
    resetFromUid,
    deleteMessageMutate,
    updateMessageMutate,
  };
};
