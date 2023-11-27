import { Modal } from '@/components/Parts/Modal/Modal';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { EditGroupDetail } from '../createGroup/EditGroupDetail';
import { GroupEntity } from '@/hooks/api/group/useFetchGetGroup';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { KeyedMutator } from 'swr';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { useFetchGroup } from '@/hooks/api/group/useFetchGroup';
import PrimaryButton from '@/components/Button/PrimaryButton';
import TertiaryButton from '@/components/Button/TertiaryButton';

type GroupEditProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsLeaveGroupConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  group: GroupEntity;
  mutateChatRoom: KeyedMutator<FetchChatRoomResponseData>;
  mutateChatRoomList: KeyedMutator<ChatRoomEntity[]>;
};

export const GroupEditModal = (props: GroupEditProps) => {
  const { setIsOpen, setIsLeaveGroupConfirmModal, group, mutateChatRoom, mutateChatRoomList } = props;
  const { mutate: mutateGroup } = useFetchGroup(group.group_id);
  const [isClickSubmitButton, setIsClickSubmitButton] = useState(false);

  return (
    <Modal
      setShowModal={setIsOpen}
      isUseFooter
      submitButton={
        <PrimaryButton
          className="whitespace-nowrap px-6"
          onClick={() => {
            setIsClickSubmitButton(true);
          }}
        >
          グループ情報を更新
        </PrimaryButton>
      }
      closeButton={
        <TertiaryButton
          className="whitespace-nowrap px-6"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          キャンセル
        </TertiaryButton>
      }
    >
      <div className="px-4 py-10 lg:px-20">
        <p className="text-2xl font-bold">グループ情報の編集</p>

        <EditGroupDetail
          originalGroupData={group}
          isEdit
          setIsLeaveGroupConfirmModal={setIsLeaveGroupConfirmModal}
          mutateGroup={mutateGroup}
          setIsOpenEditModal={setIsOpen}
          mutateChatRoom={mutateChatRoom}
          mutateChatRoomList={mutateChatRoomList}
          isClickSubmitButton={isClickSubmitButton}
        />
      </div>
    </Modal>
  );
};
