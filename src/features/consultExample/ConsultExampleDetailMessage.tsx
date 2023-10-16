import { ConsultExampleMessageEntity } from '@/types/entities/ConsultExampleMessageEntity';
import React from 'react';
import { ConsultExampleActions } from './ConsultExampleActions';

type Props = {
  consultExampleMessage: ConsultExampleMessageEntity;
  isShowAction?: boolean;
  onLike?: (consultExampleMessageId: number) => void;
  onUnlike?: (consultExampleMessageId: number) => void;
  onComment?: (consultExampleMessage: ConsultExampleMessageEntity) => void;
  onShowComments?: (consultExampleMessage: ConsultExampleMessageEntity) => void;
};

export const ConsultExampleDetailMessage: React.FC<Props> = ({
  consultExampleMessage,
  isShowAction = true,
  onLike,
  onUnlike,
  onComment,
  onShowComments,
}: Props) => {
  const alignItems =
    consultExampleMessage.account_type === 'doctor'
      ? 'items-end'
      : 'items-start';

  return (
    <div className={`flex flex-col ${alignItems}`}>
      <div className={`flex w-[85%] flex-col lg:w-4/5 ${alignItems}`}>
        <div className="text-sm font-bold">
          {consultExampleMessage.doctor_name === ''
            ? consultExampleMessage.account_type === 'doctor'
              ? '主治医'
              : '専門医'
            : consultExampleMessage.doctor_name}
        </div>
        <div
          className={`
            mt-2
            w-full
            whitespace-pre-wrap
            break-words
            p-4
            ${
              consultExampleMessage.account_type === 'doctor'
                ? 'rounded-t-2xl rounded-bl-2xl bg-primary-light'
                : 'rounded-b-2xl rounded-tr-2xl bg-bg'
            }
          `}
          data-testid="message"
        >
          {consultExampleMessage.file_path == '' ? (
            consultExampleMessage.message.trim()
          ) : (
            <img src={consultExampleMessage.file_path} alt='image' />
          )}
        </div>
        {isShowAction && (
          <div className="mt-2 lg:w-full">
            <ConsultExampleActions
              likeCount={consultExampleMessage.like_count}
              commentCount={consultExampleMessage.comment_count}
              isLiked={consultExampleMessage.is_liked}
              isShortOnMobile
              onLike={
                onLike ? () => onLike(consultExampleMessage.uid) : undefined
              }
              onUnlike={
                onUnlike ? () => onUnlike(consultExampleMessage.uid) : undefined
              }
              onComment={
                onComment ? () => onComment(consultExampleMessage) : undefined
              }
              onShowComments={
                onShowComments
                  ? () => onShowComments(consultExampleMessage)
                  : undefined
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
