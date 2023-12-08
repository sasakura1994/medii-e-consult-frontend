import PrimaryButton from '@/components/Button/PrimaryButton';
import TertiaryButton from '@/components/Button/TertiaryButton';
import { Modal } from '@/components/Parts/Modal/Modal';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { GroupEntity } from '@/hooks/api/group/useFetchGetGroup';
import { usePostExitGroup } from '@/hooks/api/group/usePostExitGroup';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { useRouter } from 'next/router';
import React from 'react';
import { KeyedMutator } from 'swr';

type LeaveGroupConfirmModalProps = {
  setIsOpen: (isOpen: boolean) => void;
  group: GroupEntity;
  accountId: string;
  mutateChatRoom?: KeyedMutator<FetchChatRoomResponseData>;
  mutateChatRoomList?: KeyedMutator<ChatRoomEntity[]>;
};

export const LeaveGroupConfirmModal = (props: LeaveGroupConfirmModalProps) => {
  const { setIsOpen, group, accountId, mutateChatRoom, mutateChatRoomList } = props;
  const router = useRouter();
  const { postExitGroup } = usePostExitGroup();
  const submit = async () => {
    await postExitGroup({ group_id: group.group_id, account_id: accountId });
    await mutateChatRoom?.();
    await mutateChatRoomList?.();
    setIsOpen(false);
    router.push('/group');
  };
  return (
    <Modal
      isUseFooter
      submitButton={
        <PrimaryButton className="bg-strong hover:bg-strong focus:bg-strong" onClick={submit}>
          退出する
        </PrimaryButton>
      }
      closeButton={
        <TertiaryButton
          onClick={() => {
            setIsOpen(false);
          }}
        >
          キャンセル
        </TertiaryButton>
      }
    >
      <div className="px-4 py-10 lg:px-20">
        <p className="text-center text-2xl font-bold">グループから退出します</p>
        <p className="mt-8 text-center text-[#333333]">
          グループチャットを参照することが出来なくなりますが本当によろしいですか？
        </p>
      </div>
    </Modal>
  );
};
