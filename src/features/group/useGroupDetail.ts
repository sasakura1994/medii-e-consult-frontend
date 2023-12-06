import { isGroupSelectedState } from '@/globalStates/group';
import { FetchChatListResponseData } from '@/hooks/api/chat/useFetchChatList';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { useFetchGetGroup } from '@/hooks/api/group/useFetchGetGroup';
import { useToken } from '@/hooks/authentication/useToken';
import { useSetAtom } from 'jotai';
import { useEffect, useMemo, useRef, useState } from 'react';

export type UseGroupDetailProps = {
  chatRoomData?: FetchChatRoomResponseData;
  chatListData?: FetchChatListResponseData;
  fetchNewChatList: (uid: number) => void;
};

export const useGroupDetail = (props: UseGroupDetailProps) => {
  const { chatRoomData, chatListData, fetchNewChatList } = props;
  const [isOpenGroupMemberModal, setIsOpenGroupMemberModal] = useState(false);
  const [isShowNotificationFrequencySettingModal, setIsShowNotificationFrequencySettingModal] = useState(true);
  const [isOpenGroupEditModal, setIsOpenGroupEditModal] = useState(false);
  const [isLeaveGroupConfirmModal, setIsLeaveGroupConfirmModal] = useState(false);
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const setIsGroupSelected = useSetAtom(isGroupSelectedState);
  const { accountId } = useToken();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { group } = useFetchGetGroup(chatRoomData?.chat_room.group_id ?? undefined);
  const oldScrollHeightRef = useRef(0);

  const isShowNotificationFrequencySetting = useMemo(() => {
    if (group && !group.is_notification_frequency_initialized) {
      return true;
    }
    return false;
  }, [group]);

  const groupMember = useMemo(() => {
    if (chatRoomData && chatRoomData.members && chatRoomData.me) {
      const members = chatRoomData.members;
      // 一致するメンバーがいない場合だけpushする
      if (!members.some((member) => member.account_id === chatRoomData.me?.account_id)) {
        members.push(chatRoomData.me);
      }
      return members;
    }
    return [];
  }, [chatRoomData]);
  useEffect(() => {
    if (!chatListData) {
      return;
    }

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      if (target.scrollTop === 0) {
        // スクロールが一番上に来たら、一番上のメッセージのUIDを取得
        const topMessageUid = chatListData[0].uid;
        // スクロール位置を保存
        oldScrollHeightRef.current = target.scrollHeight;
        // fetchNewChatListを呼び出して新しいfromUidを設定する

        fetchNewChatList(topMessageUid);
      }
    };

    chatListRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      chatListRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [chatListData, chatRoomData, fetchNewChatList]);
  useEffect(() => {
    if (chatListRef.current) {
      const newScrollHeight = chatListRef.current.scrollHeight;
      const addedHeight = newScrollHeight - oldScrollHeightRef.current;
      // スクロール位置を差分だけ下に移動
      chatListRef.current.scrollTop += addedHeight;
      oldScrollHeightRef.current = newScrollHeight;
    }
  }, [chatListData, chatRoomData]);

  useEffect(() => {
    // チャットルームIDが変わったときに高さをリセット
    if (chatListRef.current) {
      oldScrollHeightRef.current = 0;
    }
  }, [chatRoomData?.chat_room.chat_room_id]);

  return {
    group,
    isLeaveGroupConfirmModal,
    accountId,
    isOpenGroupEditModal,
    groupMember,
    isShowNotificationFrequencySetting,
    isShowNotificationFrequencySettingModal,
    setIsGroupSelected,
    chatListRef,
    setIsOpenGroupMemberModal,
    setIsShowNotificationFrequencySettingModal,
    setIsOpenGroupEditModal,
    setIsLeaveGroupConfirmModal,
    selectedImage,
    setSelectedImage,
    isOpenGroupMemberModal,
  };
};
