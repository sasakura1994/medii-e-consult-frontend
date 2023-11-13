import React from 'react';
import { Review } from './ResolveChatRoomModal';

type ReviewRatingProps = {
  review: Review;
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
};

export const ReviewRating = (props: ReviewRatingProps) => {
  const { review, setReviews } = props;
  return (
    <div className="mb-6">
      <p className="mb-2 text-base font-semibold text-text-primary">{review.label}</p>
      <div className="my-2 flex justify-between">
        <div className="flex w-24 flex-col items-center">
          <img
            src={review.value >= 1 ? 'icons/star-fill.svg' : 'icons/star-outlined.svg'}
            className="cursor-pointer"
            alt="star1"
            onClick={() =>
              setReviews((reviews) => {
                return reviews.map((r) => {
                  if (r.key === review.key) {
                    return { ...review, value: 1 };
                  }
                  return r;
                });
              })
            }
          />
          <p className="mt-2 text-center text-xs font-light text-text-secondary">{review.lowRatingText}</p>
        </div>
        <div className="flex w-24 flex-col items-center">
          <img
            src={review.value >= 2 ? 'icons/star-fill.svg' : 'icons/star-outlined.svg'}
            className="cursor-pointer"
            alt="star2"
            onClick={() =>
              setReviews((reviews) => {
                return reviews.map((r) => {
                  if (r.key === review.key) {
                    return { ...review, value: 2 };
                  }
                  return r;
                });
              })
            }
          />
        </div>
        <div className="flex w-24 flex-col items-center">
          <img
            src={review.value >= 3 ? 'icons/star-fill.svg' : 'icons/star-outlined.svg'}
            className="cursor-pointer"
            alt="star3"
            onClick={() =>
              setReviews((reviews) => {
                return reviews.map((r) => {
                  if (r.key === review.key) {
                    return { ...review, value: 3 };
                  }
                  return r;
                });
              })
            }
          />
          <p className="mt-2 text-center text-xs font-light text-text-secondary">{review.mediumRatingText}</p>
        </div>
        <div className="flex w-24 flex-col items-center">
          <img
            src={review.value >= 4 ? 'icons/star-fill.svg' : 'icons/star-outlined.svg'}
            className="cursor-pointer"
            alt="star4"
            onClick={() =>
              setReviews((reviews) => {
                return reviews.map((r) => {
                  if (r.key === review.key) {
                    return { ...review, value: 4 };
                  }
                  return r;
                });
              })
            }
          />
        </div>
        <div className="flex w-24 flex-col items-center">
          <img
            src={review.value >= 5 ? 'icons/star-fill.svg' : 'icons/star-outlined.svg'}
            className="cursor-pointer"
            alt="star5"
            onClick={() =>
              setReviews((reviews) => {
                return reviews.map((r) => {
                  if (r.key === review.key) {
                    return { ...review, value: 5 };
                  }
                  return r;
                });
              })
            }
          />
          <p className="mt-2 text-center text-xs font-light text-text-secondary">{review.highRatingText}</p>
        </div>
      </div>
    </div>
  );
};
