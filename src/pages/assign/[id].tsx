import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { Assign } from '@/features/chat/assign/Assign';
import { useAssign } from '@/features/chat/assign/useAssign';
import { AssignConfirmationModal } from '@/features/chat/assign/AssignConfirmationModal';
import { AlreadyAssigned } from '@/features/chat/assign/AlreadyAssigned';
import { Container } from '@/components/Layouts/Container';
import { LegacyLayout } from '@/components/Layouts/LegacyLayout';

const AssignPage: NextPageWithLayout = () => {
  const useAssignData = useAssign();
  const {
    assign,
    chatRoom,
    consultExample,
    consultExampleMessages,
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
          <Container className="pt-4 pb-10">
            <Assign chatRoom={chatRoom} images={images || []} onConfirm={() => setIsConfirming(true)} />
          </Container>
        ) : (
          <AlreadyAssigned
            chatRoom={chatRoom}
            consultExample={consultExample}
            consultExampleMessages={consultExampleMessages}
          />
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

AssignPage.getLayout = (page: React.ReactElement) => {
  return <LegacyLayout>{page}</LegacyLayout>;
};

export default AssignPage;
