import { isGroupSelectedState } from '@/globalStates/group';
import { useFetchChatList } from '@/hooks/api/chat/useFetchChatList';
import { useFetchChatRoom } from '@/hooks/api/chat/useFetchChatRoom';
import { useFetchChatRoomList } from '@/hooks/api/chat/useFetchChatRoomList';
import { mutateFetchUnreadCounts } from '@/hooks/api/chat/useFetchUnreadCounts';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { useToken } from '@/hooks/authentication/useToken';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
type WebsocketResponseMessage = {
  type: 'subscribe_response' | 'pong' | 'mes';
  param: string;
  data: string;
};

type Query = {
  group_room_id?: string;
  admin?: 'true';
};

export const useGroup = () => {
  const router = useRouter();
  const { socket } = useWebSocket();
  const { token, accountId } = useToken();
  const { group_room_id } = router.query as Query;

  const isGroupSelected = useAtomValue(isGroupSelectedState);
  const { data: groupRoomList, mutate: mutateChatRoomList } = useFetchChatRoomList({
    query: ['CONFERENCE'],
  });
  const { data: chatRoomData, mutate: mutateChatRoom } = useFetchChatRoom(group_room_id);
  const { medicalSpecialities } = useFetchMedicalSpecialities();
  const { data: chatListData, mutate: mutateChatList } = useFetchChatList(group_room_id);

  useEffect(() => {
    if (group_room_id) {
      mutateFetchUnreadCounts();
    }
  }, [group_room_id]);

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
  }, [accountId, mutateChatList, mutateChatRoom, mutateChatRoomList, socket, token]);

  return {
    group_room_id,
    isGroupSelected,
    groupRoomList,
    chatRoomData,
    medicalSpecialities,
    chatListData,
    mutateChatRoom,
    mutateChatRoomList,
    mutateChatList,
  };
};
