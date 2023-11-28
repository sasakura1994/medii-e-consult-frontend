import { Modal } from '@/components/Parts/Modal/Modal';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import React from 'react';
import { KeyedMutator } from 'swr';
import { ReviewRating } from './ReviewRating';
import TextArea from '@/components/TextArea/TextArea';
import { Optional } from '@/components/Parts/Form/Optional';
import PrimaryButton from '@/components/Button/PrimaryButton';
import TertiaryButton from '@/components/Button/TertiaryButton';
import { Required } from '@/components/Parts/Form/Required';
import { useResolveChatRoomModal } from './useResolveChatRoomModal';

export type ReviewScoreNumber = 0 | 1 | 2 | 3 | 4 | 5;

export type Review = {
  key: string;
  label: string;
  lowRatingText: string;
  mediumRatingText: string;
  highRatingText: string;
  value: ReviewScoreNumber;
  isRequired: boolean;
};

export type ResolveChatRoomModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenReConsultConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
  chatRoomData: FetchChatRoomResponseData;
  mutateChatRoom?: KeyedMutator<FetchChatRoomResponseData>;
  setSelectedTab: React.Dispatch<React.SetStateAction<'open' | 'close'>>;
};

export const ResolveChatRoomModal = (props: ResolveChatRoomModalProps) => {
  const { setIsOpen } = props;

  const {
    title,
    page,
    setPage,
    aboutConsultReviews,
    setAboutConsultReviews,
    aboutSystemReviews,
    setAboutSystemReviews,
    aboutSystemComment,
    setAboutSystemComment,
    resolve,
    questionaryItems,
    questionaryAnswers,
    setQuestionaryAnswers,
  } = useResolveChatRoomModal(props);

  return (
    <Modal
      pcWidth="600"
      disableCloseOnOverlayClick
      setShowModal={setIsOpen}
      isUseFooter
      submitButton={
        page === 'aboutConsult' ? (
          <PrimaryButton
            size="large"
            disabled={aboutConsultReviews.some((review) => review.value === 0)}
            onClick={() => {
              setPage('aboutSystem');
            }}
          >
            システム評価に進む
          </PrimaryButton>
        ) : (
          <PrimaryButton
            size="large"
            disabled={aboutSystemReviews.some((review) => review.value === 0) || questionaryAnswers.length === 0}
            onClick={async () => {
              resolve();
            }}
          >
            評価してコンサルを終了
          </PrimaryButton>
        )
      }
      closeButton={
        page === 'aboutConsult' ? (
          <TertiaryButton
            size="large"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            キャンセル
          </TertiaryButton>
        ) : (
          <TertiaryButton
            size="large"
            onClick={() => {
              setPage('aboutConsult');
            }}
          >
            戻る
          </TertiaryButton>
        )
      }
    >
      {page === 'aboutConsult' ? (
        <div className="mb-3">
          <p className="m-6 text-left text-2xl font-bold text-text-primary">{title}</p>
          <div className="mx-4 lg:mx-6">
            {aboutConsultReviews.map((review) => {
              return <ReviewRating key={review.key} review={review} setReviews={setAboutConsultReviews} />;
            })}
          </div>
        </div>
      ) : (
        <div className="mb-3">
          <p className="m-4 mt-6 text-center text-2xl font-bold text-text-primary">
            E-コンサルについてご意見をお聞かせください。
          </p>
          <div className="mx-4 lg:mx-6">
            {aboutSystemReviews.map((review) => {
              return <ReviewRating key={review.key} review={review} setReviews={setAboutSystemReviews} />;
            })}
            <div className="mb-2 mt-6 flex items-center gap-2">
              <p className="text-left font-semibold">
                コンサルを経て、当該症例に対する現在のお考えをお聞かせください（複数選択可）
              </p>
              <Required>必須</Required>
            </div>
            {questionaryItems &&
              questionaryItems.map((questionaryItem) => (
                <div className="ml-2 mt-1.5 flex items-center" key={questionaryItem.id}>
                  <input
                    id={String(questionaryItem.id)}
                    type="checkbox"
                    className="mr-2"
                    value={questionaryItem.id}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setQuestionaryAnswers((prev) => [...prev, questionaryItem.id]);
                      } else {
                        setQuestionaryAnswers(questionaryAnswers.filter((answer) => answer !== questionaryItem.id));
                      }
                    }}
                  />
                  <label htmlFor={String(questionaryItem.id)} className="text-[15px] text-[#333333]">
                    {questionaryItem.text}
                  </label>
                </div>
              ))}
            <div className="mt-6">
              <TextArea
                id="aboutSystem"
                name="aboutSystem"
                onChange={(e) => {
                  setAboutSystemComment(e.target.value);
                }}
                value={aboutSystemComment}
                labelText="E-コンサルへのご意見・ご要望"
                placeholder="ご意見をお聞かせください。"
                className="h-[72px] resize-none"
                labelBadge={<Optional>任意</Optional>}
              />
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
