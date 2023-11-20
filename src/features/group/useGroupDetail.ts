import { isGroupSelectedState } from '@/globalStates/group';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { useFetchGetGroup } from '@/hooks/api/group/useFetchGetGroup';
import { useToken } from '@/hooks/authentication/useToken';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { useSetAtom } from 'jotai';
import { useCallback, useMemo, useRef, useState } from 'react';

type UseGroupDetailProps = {
  chatRoomData?: FetchChatRoomResponseData;
};

export const useGroupDetail = (props: UseGroupDetailProps) => {
  const { chatRoomData } = props;
  const [isOpenGroupMemberModal, setIsOpenGroupMemberModal] = useState(false);
  const [isShowNotificationFrequencySettingModal, setIsShowNotificationFrequencySettingModal] = useState(true);
  const [isOpenGroupEditModal, setIsOpenGroupEditModal] = useState(false);
  const [isLeaveGroupConfirmModal, setIsLeaveGroupConfirmModal] = useState(false);
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const setIsGroupSelected = useSetAtom(isGroupSelectedState);
  const { accountId } = useToken();
  const [, setSelectedImage] = useState<string>('');
  const { getMedicalSpecialityName } = useMedicalSpeciality();
  const { group } = useFetchGetGroup(chatRoomData?.chat_room.group_id ?? undefined);
  const getExperienceYear = useCallback((year: number) => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const passedYear = currentYear - year;

    return passedYear + 1;
  }, []);

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
  return {
    group,
    getMedicalSpecialityName,
    isLeaveGroupConfirmModal,
    accountId,
    isOpenGroupEditModal,
    groupMember,
    isShowNotificationFrequencySetting,
    isShowNotificationFrequencySettingModal,
    getExperienceYear,
    setIsGroupSelected,
    chatListRef,
    setIsOpenGroupMemberModal,
    setIsShowNotificationFrequencySettingModal,
    setIsOpenGroupEditModal,
    setIsLeaveGroupConfirmModal,
    setSelectedImage,
    isOpenGroupMemberModal,
  };
};
