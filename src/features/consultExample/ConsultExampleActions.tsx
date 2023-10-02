import React from 'react';

type Props = {
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isShortOnMobile?: boolean;
  isCommentButtonHidden?: boolean;
  isShowCommentsButtonHidden?: boolean;
  onLike?: () => void;
  onUnlike?: () => void;
  onComment?: () => void;
  onShowComments?: () => void;
};

export const ConsultExampleActions: React.FC<Props> = ({
  likeCount,
  commentCount,
  isLiked,
  isShortOnMobile = false,
  isCommentButtonHidden = false,
  isShowCommentsButtonHidden = false,
  onLike,
  onUnlike,
  onComment,
  onShowComments,
}: Props) => {
  const likeOrUnlike = isLiked ? onUnlike : onLike;

  return (
    <div
      className={`flex justify-between  ${
        isShortOnMobile
          ? 'flex-col items-end gap-2 lg:flex-row lg:items-center lg:gap-0 lg:bg-bg lg:px-4 lg:py-3'
          : 'bg-bg px-4 py-3'
      }`}
    >
      <div
        className={`flex items-center text-sm ${
          isShortOnMobile ? 'bg-bg bg-none px-4 py-3 lg:px-0 lg:py-0' : ''
        }`}
      >
        <a
          href={likeOrUnlike ? '#' : undefined}
          className="flex items-center"
          onClick={(e) => {
            e.preventDefault();
            likeOrUnlike?.();
          }}
        >
          <img
            src={isLiked ? 'icons/good_fill.svg' : 'icons/good_out.svg'}
            width="24"
            height="24"
            alt={isLiked ? 'いいね済み' : '未いいね'}
          />
          <div className="ml-1">いいね</div>
        </a>
        {!isCommentButtonHidden && (
          <a
            href={onComment ? '#' : undefined}
            className="flex items-center"
            onClick={(e) => {
              e.preventDefault();
              onComment?.();
            }}
          >
            <img
              src="icons/comment.svg"
              width="24"
              height="24"
              className="ml-4 block"
              alt=""
            />
            <div className="ml-1">コメントする</div>
          </a>
        )}
      </div>
      <div className="flex items-center text-xs">
        <img
          src="icons/good_out.svg"
          width="18"
          height="18"
          alt="いいねの数"
        />
        <div className="ml-1">{likeCount}</div>
        {!isShowCommentsButtonHidden && (
          <a
            className="flex items-center"
            href={onShowComments ? '#' : undefined}
            onClick={(e) => {
              e.preventDefault();
              onShowComments?.();
            }}
          >
            <img
              src="icons/comment.svg"
              width="18"
              height="18"
              className="ml-4 block"
              alt="コメントの数"
            />
            <div className="ml-1">{commentCount}</div>
          </a>
        )}
      </div>
    </div>
  );
};
