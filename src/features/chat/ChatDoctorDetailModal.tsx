import { Modal } from '@/components/Parts/Modal/Modal';
import { ChatMemberEntity } from '@/types/entities/chat/ChatMemberEntity';
import React from 'react';

type ChatDoctorDetailModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  member: ChatMemberEntity;
};

export const ChatDoctorDetailModal = (props: ChatDoctorDetailModalProps) => {
  const { setIsOpen, member } = props;
  return (
    <Modal setShowModal={setIsOpen}>
      <p className="text-2xl">{member.last_name + member.first_name + ' 先生'}</p>
    </Modal>
  );
};
