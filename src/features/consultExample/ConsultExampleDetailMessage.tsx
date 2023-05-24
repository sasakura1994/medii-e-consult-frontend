import { ConsultExampleMessageEntity } from '@/types/entities/ConsultExampleMessageEntity';
import React from 'react';
import { ConsultExampleActions } from './ConsultExampleActions';

type Props = {
  consultExampleMessage: ConsultExampleMessageEntity;
};

export const ConsultExampleDetailMessage: React.FC<Props> = ({
  consultExampleMessage,
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
        >
          {consultExampleMessage.message.trim()}
        </div>
        <div className="mt-2 lg:w-full">
          <ConsultExampleActions
            likeCount={consultExampleMessage.like_count}
            commentCount={consultExampleMessage.comment_count}
            isLiked={consultExampleMessage.is_liked}
            isShortOnMobile
            onLike={() => true}
            onUnlike={() => true}
            onComment={() => true}
            onShowComments={() => true}
          />
        </div>
      </div>
    </div>
  );
};
