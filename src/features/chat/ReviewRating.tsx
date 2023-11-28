import React from 'react';
import { Review, ReviewScoreNumber } from './ResolveChatRoomModal';
import { ReviewRatingStar } from './ReviewRatingStar';
import { Optional } from '@/components/Parts/Form/Optional';
import { Required } from '@/components/Parts/Form/Required';

type ReviewRatingProps = {
  review: Review;
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
};

export const ReviewRating = (props: ReviewRatingProps) => {
  const { review, setReviews } = props;
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center">
        <p className="mr-2 text-base font-bold text-text-primary">{review.label}</p>
        {review.isRequired ? <Required>必須</Required> : <Optional>任意</Optional>}
      </div>
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
