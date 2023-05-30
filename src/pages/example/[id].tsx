import React from 'react';
import type { NextPage } from 'next';
import { Container } from '@/components/Layouts/Container';
import { useRouter } from 'next/router';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { useConsultExamplePage } from '@/features/consultExample/useConsultExamplePage';
import { ConsultExampleDetail } from '@/features/consultExample/ConsultExampleDetail';
import { ConsultExampleCommentModal } from '@/features/consultExample/ConsultExampleCommentModal';
import { ConsultExampleCommentsModal } from '@/features/consultExample/ConsultExampleCommentsModal';
import { ConsultExampleAllCommentsModal } from '@/features/consultExample/ConsultExampleAllCommentsModal';

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
    messageIdForCommentsModal,
    consultExampleMessageIdForComment,
    consultExampleMessages,
    isAllCommentsModalShown,
    isCommentsModalShown,
    messageForCommentsModal,
    openCommentsModal,
    openCommentsModalForMessage,
    setIsAllCommentsModalShown,
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
            onShowCommentsForMessage={openCommentsModalForMessage}
            onShowAllComments={() => setIsAllCommentsModalShown(true)}
          />
        )}
      </Container>
      {consultExample && (
        <>
          {commentFormMessage !== '' && (
            <ConsultExampleCommentModal
              consultExampleId={consultExample.example_id}
              consultExampleMessageId={consultExampleMessageIdForComment}
              message={commentFormMessage}
              onClose={closeCommentForm}
            />
          )}
          {isCommentsModalShown && (
            <ConsultExampleCommentsModal
              consultExample={consultExample}
              consultExampleMessageId={messageIdForCommentsModal}
              message={messageForCommentsModal}
              onClose={closeCommentsModal}
            />
          )}
          {isAllCommentsModalShown && (
            <ConsultExampleAllCommentsModal
              consultExample={consultExample}
              onClose={() => setIsAllCommentsModalShown(false)}
            />
          )}
        </>
      )}
    </>
  );
};

export default ConsultExamplePage;
