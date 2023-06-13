import { Card } from '@/components/Parts/Card/Card';
import { ConsultExampleDetailEntity } from '@/types/entities/ConsultExampleDetailEntity';
import { ConsultExampleMessageEntity } from '@/types/entities/ConsultExampleMessageEntity';
import React from 'react';
import { ConsultExampleTag } from './ConsultExampleTag';
import { useConsultExample } from '@/features/consultExample/useConsultExample';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { ConsultExampleFirstAnswerTime } from './ConsultExampleFirstAnswerTime';
import { dateFormat } from '@/libs/date';
import { ConsultExampleActions } from './ConsultExampleActions';
import { ConsultExampleDetailMessage } from './ConsultExampleDetailMessage';
import { useConsultExampleActions } from './useConsultExampleActions';

type Props = {
  consultExample: ConsultExampleDetailEntity;
  consultExampleMessages: ConsultExampleMessageEntity[];
  onComment?: () => void;
  onShowComments?: () => void;
  onCommentForMessage?: (
    consultExampleMessage: ConsultExampleMessageEntity
  ) => void;
  onShowCommentsForMessage?: (
    consultExampleMessage: ConsultExampleMessageEntity
  ) => void;
  onShowAllComments?: () => void;
};

export const ConsultExampleDetail: React.FC<Props> = ({
  consultExample,
  consultExampleMessages,
  onComment,
  onShowComments,
  onCommentForMessage,
  onShowAllComments,
  onShowCommentsForMessage,
}: Props) => {
  const { getMedicalSpecialityName } = useMedicalSpeciality();
  const { getAgeText, getGenderText } = useConsultExample();
  const {
    likeAndMutate,
    likeMessageAndMutate,
    unlikeAndMutate,
    unlikeMessageAndMutate,
  } = useConsultExampleActions(consultExample.example_id);

  return (
    <>
      <Card className="px-5 py-10 lg:px-10">
        <div className="flex gap-2">
          <div>
            <ConsultExampleTag>
              {consultExample.speciality_code !== ''
                ? getMedicalSpecialityName(consultExample.speciality_code)
                : consultExample.category_name}
            </ConsultExampleTag>
          </div>
          <div className="flex flex-1 flex-col items-end gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
            {consultExample.first_answer_minutes > 0 ? (
              <ConsultExampleFirstAnswerTime
                firstAnswerMinutes={consultExample.first_answer_minutes}
              />
            ) : (
              <div></div>
            )}
            <div className="flex items-center text-sm lg:text-primary">
              <img
                className="lg:hidden"
                src="/icons/good_out.svg"
                width="24"
                height="24"
                alt="いいねの数"
              />
              <img
                className="hidden lg:block"
                src="/icons/good_out_primary.svg"
                width="24"
                height="24"
                alt="いいねの数"
              />
              <div className="ml-1">{consultExample.all_like_count}</div>
              <a
                href={onShowAllComments ? '#' : undefined}
                className="flex items-center"
                onClick={
                  onShowAllComments
                    ? (e) => {
                        e.preventDefault();
                        onShowAllComments();
                      }
                    : undefined
                }
              >
                <img
                  src="/icons/comment.svg"
                  width="24"
                  height="24"
                  className="ml-4 block lg:hidden"
                  alt="コメントの数"
                />
                <img
                  src="/icons/comment_primary.svg"
                  width="24"
                  height="24"
                  className="ml-4 hidden lg:block"
                  alt="コメントの数"
                />
                <div className="ml-1">{consultExample.all_comment_count}</div>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 text-2xl font-bold">{consultExample.title}</div>
        <div className="mt-5 flex flex-col justify-between text-sm lg:mt-10 lg:flex-row">
          <div className="flex gap-1">
            {consultExample.age !== null && (
              <div>{getAgeText(consultExample.age)}</div>
            )}
            <div>
              {getGenderText(consultExample.gender, consultExample.age)}
            </div>
            <div>{consultExample.disease_name}</div>
          </div>
          <div className="text-right">
            <div className="whitespace-nowrap">
              事例公開日：
              {dateFormat(consultExample.published_date, 'YYYY/M/D')}
            </div>
            {/* consultant_date は必須のためそのうちここの条件分岐は削除したい */}
            {consultExample.consultant_date && (
              <div className="whitespace-nowrap">
                コンサル実施日：
                {dateFormat(consultExample.consultant_date, 'YYYY/M/D')}
              </div>
            )}
          </div>
        </div>
        <div className="mt-5">{consultExample.background}</div>
        <div className="mt-4">
          <ConsultExampleActions
            likeCount={consultExample.like_count}
            commentCount={consultExample.comment_count}
            isLiked={consultExample.is_liked}
            onLike={likeAndMutate}
            onUnlike={unlikeAndMutate}
            onComment={onComment}
            onShowComments={onShowComments}
          />
        </div>
      </Card>
      <Card className="mt-4 px-4 pb-[80px] pt-10 lg:px-7 lg:pb-10">
        <div className="flex flex-col gap-8">
          {consultExampleMessages.map((consultExampleMesasge) => (
            <ConsultExampleDetailMessage
              key={consultExampleMesasge.uid}
              consultExampleMessage={consultExampleMesasge}
              onLike={likeMessageAndMutate}
              onUnlike={unlikeMessageAndMutate}
              onComment={onCommentForMessage}
              onShowComments={onShowCommentsForMessage}
            ></ConsultExampleDetailMessage>
          ))}
        </div>
      </Card>
    </>
  );
};
