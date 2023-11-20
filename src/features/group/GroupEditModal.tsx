import { Modal } from '@/components/Parts/Modal/Modal';
import React, { Dispatch, SetStateAction } from 'react';
import { EditGroupDetail } from '../createGroup/EditGroupDetail';
import { GroupEntity } from '@/hooks/api/group/useFetchGetGroup';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { KeyedMutator } from 'swr';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { useFetchGroup } from '@/hooks/api/group/useFetchGroup';

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
  return (
    <Modal setShowModal={setIsOpen}>
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
        />
      </div>
    </Modal>
  );
};
