import React from 'react';
import { Review, ReviewScoreNumber } from './ResolveChatRoomModal';
import { ReviewRatingStar } from './ReviewRatingStar';

type ReviewRatingProps = {
  review: Review;
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
};

export const ReviewRating = (props: ReviewRatingProps) => {
  const { review, setReviews } = props;
  return (
    <div className="mb-6">
      <p className="mb-2 text-base font-bold text-text-primary">{review.label}</p>
      <div className="my-2 flex justify-between">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((value) => {
          return (
            <ReviewRatingStar key={value} setReviews={setReviews} review={review} value={value as ReviewScoreNumber} />
          );
        })}
      </div>
    </div>
  );
};
