import React from 'react';
import { ConsultExampleActions } from './ConsultExampleActions';
import { ConsultExampleDetailEntity } from '@/types/entities/ConsultExampleDetailEntity';
import { useConsultExampleActions } from './useConsultExampleActions';
import { useDoctor } from '@/hooks/useDoctor';
import { dateFormat } from '@/libs/date';
import { ConsultExampleMessageEntity } from '@/types/entities/ConsultExampleMessageEntity';
import { ConsultExampleCommentEntity } from '@/types/entities/ConsultExampleCommentEntity';

type Props = {
  consultExample: ConsultExampleDetailEntity;
  consultExampleMessage?: ConsultExampleMessageEntity;
  consultExampleComments: ConsultExampleCommentEntity[];
  message: string;
};

export const ConsultExampleComments: React.FC<Props> = ({
  consultExample,
  consultExampleMessage,
  consultExampleComments,
  message,
}: Props) => {
  const {
    likeAndMutate,
    unlikeAndMutate,
    likeMessageAndMutate,
    unlikeMessageAndMutate,
    likeCommentAndMutate,
    unlikeCommentAndMutate,
  } = useConsultExampleActions(consultExample.example_id);
  const { calculateExperienceYear } = useDoctor();

  return (
    <>
      <p>{message}</p>
      <div className="mt-2">
        {consultExampleMessage ? (
          <ConsultExampleActions
            likeCount={consultExampleMessage.like_count}
            commentCount={consultExampleMessage.comment_count}
            isLiked={consultExampleMessage.is_liked}
            isCommentButtonHidden
            onLike={() => likeMessageAndMutate(consultExampleMessage.uid)}
            onUnlike={() => unlikeMessageAndMutate(consultExampleMessage.uid)}
          />
        ) : (
          <ConsultExampleActions
            likeCount={consultExample.like_count}
            commentCount={consultExample.comment_count}
            isLiked={consultExample.is_liked}
            isCommentButtonHidden
            onLike={likeAndMutate}
            onUnlike={unlikeAndMutate}
          />
        )}
      </div>
      <div className="ml-2 mt-2 border-l-[3px] border-[#c4c4c4] pl-6">
        {consultExampleComments &&
          consultExampleComments.map((consultExampleComment) => (
            <>
              <div key={consultExampleComment.consult_example_comment_id} className="mt-4">
                {consultExampleComment.body}
              </div>
              <div className="mt-2 flex justify-between text-sm text-[#6c6c6c]">
                <div>
                  {consultExampleComment.is_anonymous
                    ? '匿名'
                    : `${consultExampleComment.doctor_last_name} ${consultExampleComment.doctor_first_name}`}
                  （{calculateExperienceYear(consultExampleComment.qualified_year)}
                  年目 {consultExampleComment.speciality}）
                </div>
                <div>{dateFormat(consultExampleComment.created_date, 'YYYY/M/D')}</div>
              </div>
              <div className="mt-3">
                <ConsultExampleActions
                  likeCount={consultExampleComment.like_count}
                  commentCount={0}
                  isCommentButtonHidden
                  isShowCommentsButtonHidden
                  isLiked={consultExampleComment.is_liked}
                  onLike={() =>
                    likeCommentAndMutate({
                      consultExampleMessageId: consultExampleMessage?.uid,
                      consultExampleCommentId: consultExampleComment.consult_example_comment_id,
                    })
                  }
                  onUnlike={() =>
                    unlikeCommentAndMutate({
                      consultExampleMessageId: consultExampleMessage?.uid,
                      consultExampleCommentId: consultExampleComment.consult_example_comment_id,
                    })
                  }
                />
              </div>
            </>
          ))}
      </div>
    </>
  );
};
