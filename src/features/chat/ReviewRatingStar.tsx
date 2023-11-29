import React from 'react';
import { Review, ReviewScoreNumber } from './ResolveChatRoomModal';

type ReviewRatingStarProps = {
  review: Review;
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  value: ReviewScoreNumber;
};

export const ReviewRatingStar = (props: ReviewRatingStarProps) => {
  const { review, setReviews, value } = props;
  return (
    <div className="flex w-24 flex-col items-center">
      <img
        src={review.value >= value ? 'icons/star-fill.svg' : 'icons/star-outlined.svg'}
        className="cursor-pointer"
        alt={'star' + value}
        onClick={() =>
          setReviews((reviews) => {
            return reviews.map((r) => {
              if (r.key === review.key) {
                return { ...review, value: value };
              }
              return r;
            });
          })
        }
      />
      {value === 1 && (
        <p className="mt-2 text-center text-xs font-normal text-text-secondary">{review.lowRatingText}</p>
      )}
      {value === 3 && (
        <p className="mt-2 text-center text-xs font-normal text-text-secondary">{review.mediumRatingText}</p>
      )}
      {value === 5 && (
        <p className="mt-2 text-center text-xs font-normal text-text-secondary">{review.highRatingText}</p>
      )}
    </div>
  );
};
