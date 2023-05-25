import React from 'react';
import type { NextPage } from 'next';
import { Container } from '@/components/Layouts/Container';
import { useRouter } from 'next/router';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { useConsultExamplePage } from '@/features/consultExample/useConsultExamplePage';
import { ConsultExampleDetail } from '@/features/consultExample/ConsultExampleDetail';
import { ConsultExampleCommentModal } from '@/features/consultExample/ConsultExampleCommentModal';

type Query = {
  id: string;
};

const ConsultExamplePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query as Query;
  const {
    closeCommentForm,
    commentFormMessage,
    consultExample,
    consultExampleMessages,
    consultExampleMessageIdForComment,
    createComment,
    createCommentForMessage,
    likeAndMutate,
    likeMessageAndMutate,
    isCommentSending,
    showCommentForm,
    showCommentFormForMessage,
    unlikeAndMutate,
    unlikeMessageAndMutate,
  } = useConsultExamplePage(id);
  useEventLog({ name: `/example/${id}` });

  return (
    <>
      <Container className="lg:py-6">
        {consultExample && consultExampleMessages && (
          <ConsultExampleDetail
            consultExample={consultExample}
            consultExampleMessages={consultExampleMessages}
            onLike={likeAndMutate}
            onUnlike={unlikeAndMutate}
            onLikeMessage={likeMessageAndMutate}
            onUnlikeMessage={unlikeMessageAndMutate}
            onComment={showCommentForm}
            onCommentForMessage={showCommentFormForMessage}
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
    </>
  );
};

export default ConsultExamplePage;
