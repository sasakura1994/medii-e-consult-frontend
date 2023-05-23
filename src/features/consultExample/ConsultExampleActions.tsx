import React from 'react';

type Props = {
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  onLike?: () => void;
  onUnlike?: () => void;
  onComment: () => void;
  onShowComments: () => void;
};

export const ConsultExampleActions: React.FC<Props> = ({
  likeCount,
  commentCount,
  isLiked,
  onLike,
  onUnlike,
}: Props) => {
  const likeOrUnlike = isLiked ? onUnlike : onLike;

  return (
    <div className="flex justify-between bg-bg px-4 py-3">
      <div className="flex items-center text-sm">
        <a
          href={likeOrUnlike ? '#' : undefined}
          className="flex items-center"
          onClick={(e) => {
            e.preventDefault();
            if (likeOrUnlike) {
              likeOrUnlike();
            }
          }}
        >
          <img
            src={isLiked ? '/icons/good_fill.svg' : '/icons/good_out.svg'}
            width="24"
            height="24"
            alt=""
          />
          <div className="ml-1">いいね</div>
        </a>
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
        <div className="ml-1">{likeCount}</div>
        <img
          src="/icons/comment.svg"
          width="18"
          height="18"
          className="ml-4 block"
          alt="コメントの数"
        />
        <div className="ml-1">{commentCount}</div>
      </div>
    </div>
  );
};
