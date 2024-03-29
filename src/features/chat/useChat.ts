import { chatState } from '@/globalStates/chat';
import { useFetchChatList } from '@/hooks/api/chat/useFetchChatList';
import { useFetchChatRoom } from '@/hooks/api/chat/useFetchChatRoom';
import { useFetchChatRoomList } from '@/hooks/api/chat/useFetchChatRoomList';
import { mutateFetchUnreadCounts } from '@/hooks/api/chat/useFetchUnreadCounts';
import { useGetPublishmentStatus } from '@/hooks/api/chat/useGetPublishmentStatus';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { useToken } from '@/hooks/authentication/useToken';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';

type WebsocketResponseMessage = {
  type: 'subscribe_response' | 'pong' | 'mes';
  param: string;
  data?: { event_type: 'DELETE'; uid: number };
};

type Query = {
  chat_room_id?: string;
};

export const useChat = () => {
  const router = useRouter();
  const { socket } = useWebSocket();
  const { token, accountId } = useToken();
  const { chat_room_id } = router.query as Query;
  const chatRoomIdStr = chat_room_id;

  const [chatGlobalState, setChatGlobalState] = useAtom(chatState);
  const { data: chatRoomList, mutate: mutateChatRoomList } = useFetchChatRoomList({
    query: ['FREE', 'BY_NAME', 'GROUP'],
  });
  const { data: publishmentStatusData, mutate: mutatePublishmentStatusData } = useGetPublishmentStatus(chatRoomIdStr);
  const { data: chatRoomData, mutate: mutateChatRoom } = useFetchChatRoom(chatRoomIdStr);
  const [selectedTab, setSelectedTab] = useState<'open' | 'close'>(
    chatRoomData?.chat_room.status === 'RESOLVED' || chatRoomData?.chat_room.status === 'CLOSED' ? 'close' : 'open'
  );
  const { medicalSpecialities } = useFetchMedicalSpecialities();
  const {
    data: chatListData,
    mutate: mutateChatList,
    fetchNewChatList,
    resetFromUid: resetChatListFromUid,
    deleteMessageMutate,
    updateMessageMutate,
  } = useFetchChatList(chatRoomIdStr);

  const isResponderConsult = useMemo(() => {
    if (!chatRoomData) {
      return false;
    }
    if (chatRoomData.chat_room.owner_account_id !== accountId) {
      return true;
    }
    return false;
  }, [chatRoomData, accountId]);

  useEffect(() => {
    if (chatRoomIdStr) {
      mutateFetchUnreadCounts();
    }
  }, [chatRoomIdStr]);

  useEffect(() => {
    if (!socket.current) {
      return;
    }
    if (!socket.current && !token && !accountId) {
      return;
    }
    const webSocket = socket.current;

    const onOpen = () => {
      if (webSocket && webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(
          JSON.stringify({
            type: 'subscribe',
            token: token,
            param: 'mes:' + accountId,
          })
        );
        webSocket.send(
          JSON.stringify({
            type: 'subscribe',
            token: token,
            param: 'cha:' + accountId,
          })
        );
        webSocket.send(
          JSON.stringify({
            type: 'subscribe',
            token: token,
            param: 'vcs:' + accountId,
          })
        );
      }
    };

    const onMessage = (event: MessageEvent) => {
      // メッセージには改行などの制御文字が含まれているため、削除する
      // eslint-disable-next-line no-control-regex
      const jsonText = event.data.replace(/[\u0000-\u0019]+/g, '');
      const data: WebsocketResponseMessage = JSON.parse(jsonText);
      if (data.type === 'subscribe_response' && data.param === 'vcs:' + accountId) {
        webSocket.send(
          JSON.stringify({
            type: 'ping',
            token: token,
          })
        );
      } else if (data.type === 'pong') {
        // 10秒待機してpingを送信
        setTimeout(() => {
          webSocket.send(
            JSON.stringify({
              type: 'ping',
              token: token,
            })
          );
        }, 10000);
      } else if (data.type === 'mes') {
        // TODO: なぜか500ms待機してチャット情報を更新するとチャットの送信が安定する
        setTimeout(async () => {
          if (data.data?.event_type === 'DELETE') {
            deleteMessageMutate(data.data.uid);
          }
          await mutateChatRoom();
          await mutateChatList();
          await mutateChatRoomList();
          mutateFetchUnreadCounts();
        }, 500);
      }
    };

    webSocket.addEventListener('open', onOpen);
    webSocket.addEventListener('message', onMessage);

    return () => {
      webSocket.removeEventListener('open', onOpen);
      webSocket.removeEventListener('message', onMessage);
    };
  }, [accountId, deleteMessageMutate, mutateChatList, mutateChatRoom, mutateChatRoomList, socket, token]);

  useEffect(() => {
    if (!chatRoomIdStr) {
      setChatGlobalState((prev) => {
        return {
          ...prev,
          isSelected: false,
        };
      });
    }
  }, [chatRoomIdStr, setChatGlobalState]);

  return {
    chat_room_id,
    chatRoomData,
    chatListData,
    publishmentStatusData,
    medicalSpecialities,
    chatRoomList,
    selectedTab,
    setSelectedTab,
    mutateChatRoom,
    mutateChatRoomList,
    mutatePublishmentStatusData,
    mutateChatList,
    fetchNewChatList,
    resetChatListFromUid,
    chatGlobalState,
    accountId,
    isResponderConsult,
    updateMessageMutate,
  };
};

export type UseChat = ReturnType<typeof useChat>;
