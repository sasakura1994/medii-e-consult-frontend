import { ConsultExampleDetailEntity } from '@/types/entities/ConsultExampleDetailEntity';
import React from 'react';

type Props = {
  consultExample: ConsultExampleDetailEntity;
};

export const ConsultExampleActions: React.FC<Props> = ({
  consultExample,
}: Props) => {
  return (
    <div className="flex justify-between bg-bg px-4 py-3">
      <div className="flex items-center text-sm">
        <img src="/icons/good_out.svg" width="24" height="24" alt="" />
        <div className="ml-1">いいね</div>
        <img
          src="/icons/comment.svg"
          width="24"
          height="24"
          className="ml-4 block"
          alt=""
        />
        <div className="ml-1">コメントする</div>
      </div>
      <div className="flex items-center text-xs">
        <img
          src="/icons/good_out.svg"
          width="18"
          height="18"
          alt="いいねの数"
        />
        <div className="ml-1">{consultExample.all_like_count}</div>
        <img
          src="/icons/comment.svg"
          width="18"
          height="18"
          className="ml-4 block"
          alt="コメントの数"
        />
        <div className="ml-1">{consultExample.all_comment_count}</div>
      </div>
    </div>
  );
};
