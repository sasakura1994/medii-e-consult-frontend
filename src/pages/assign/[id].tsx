import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { Assign } from '@/features/chat/assign/Assign';
import { useAssign } from '@/features/chat/assign/useAssign';
import { AssignConfirmationModal } from '@/features/chat/assign/AssignConfirmationModal';
import { AlreadyAssigned } from '@/features/chat/assign/AlreadyAssigned';
import { Container } from '@/components/Layouts/Container';

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
          <Container className="mt-4 mb-10">
            <Assign
              chatRoom={chatRoom}
              images={images || []}
              onConfirm={() => setIsConfirming(true)}
            />
          </Container>
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
