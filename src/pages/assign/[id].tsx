import React from 'react';
import { MyPageLayout } from '@/components/Layouts/MyPageLayout';
import type { NextPageWithLayout } from '@/pages/_app';
import { Assign } from '@/features/chat/assign/Assign';
import { useAssign } from '@/features/chat/assign/useAssign';
import { AssignConfirmationModal } from '@/features/chat/assign/AssignConfirmationModal';
import { AlreadyAssigned } from '@/features/chat/assign/AlreadyAssigned';

const AssignPage: NextPageWithLayout = () => {
  const useAssignData = useAssign();
  const {
    assign,
    chatRoom,
    errorMessage,
    images,
    isConfirming,
    isSending,
    setIsConfirming,
  } = useAssignData;

  return (
    <>
      {chatRoom &&
        (chatRoom.status === 'CREATED' ? (
          <Assign
            chatRoom={chatRoom}
            images={images || []}
            onConfirm={() => setIsConfirming(true)}
          />
        ) : (
          <AlreadyAssigned chatRoom={chatRoom} />
        ))}
      {isConfirming && (
        <AssignConfirmationModal
          errorMessage={errorMessage}
          isSending={isSending}
          onSubmit={assign}
          setShowModal={setIsConfirming}
        />
      )}
    </>
  );
};

export default AssignPage;

AssignPage.getLayout = (page: React.ReactElement) => {
  return <MyPageLayout>{page}</MyPageLayout>;
};
