import React from 'react';
import type { NextPage } from 'next';
import { Container } from '@/components/Layouts/Container';
import { useRouter } from 'next/router';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { useConsultExamplePage } from '@/features/consultExample/useConsultExamplePage';
import { ConsultExampleDetail } from '@/features/consultExample/ConsultExampleDetail';
import { ConsultExampleCommentModal } from '@/features/consultExample/ConsultExampleCommentModal';
import { ConsultExampleCommentsModal } from '@/features/consultExample/ConsultExampleCommentsModal';

type Query = {
  id: string;
};

const ConsultExamplePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as Query;
  const {
    closeCommentForm,
    closeCommentsModal,
    commentFormMessage,
    consultExample,
    consultExampleMessages,
    consultExampleMessageIdForComment,
    createComment,
    createCommentForMessage,
    isCommentSending,
    messageIdForCommentsModal,
    messageForCommentsModal,
    openCommentsModal,
    showCommentForm,
    showCommentFormForMessage,
  } = useConsultExamplePage(id);
  useEventLog({ name: `/example/${id}` });

  return (
    <>
      <Container className="lg:py-6">
        {consultExample && consultExampleMessages && (
          <ConsultExampleDetail
            consultExample={consultExample}
            consultExampleMessages={consultExampleMessages}
            onComment={showCommentForm}
            onCommentForMessage={showCommentFormForMessage}
            onShowComments={openCommentsModal}
          />
        )}
      </Container>
      {commentFormMessage !== '' && (
        <ConsultExampleCommentModal
          message={commentFormMessage}
          isSending={isCommentSending}
          onCreate={
            consultExampleMessageIdForComment === 0
              ? createComment
              : createCommentForMessage
          }
          onClose={closeCommentForm}
        />
      )}
      {messageIdForCommentsModal !== undefined && consultExample && (
        <ConsultExampleCommentsModal
          consultExample={consultExample}
          message={messageForCommentsModal}
          isSending={isCommentSending}
          onCreate={
            consultExampleMessageIdForComment === 0
              ? createComment
              : createCommentForMessage
          }
          onClose={closeCommentsModal}
        />
      )}
    </>
  );
};

export default ConsultExamplePage;
