import { Modal } from '@/components/Parts/Modal/Modal';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import React from 'react';
import { KeyedMutator } from 'swr';
import { ReviewRating } from './ReviewRating';
import PrimaryButton from '@/components/Button/PrimaryButton';
import TertiaryButton from '@/components/Button/TertiaryButton';
import { Required } from '@/components/Parts/Form/Required';
import { useResolveChatRoomModal } from './useResolveChatRoomModal';
import { Heading } from '@/components/Parts/Text/Heading';

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
    aboutConsultReviews,
    setAboutConsultReviews,
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
        <PrimaryButton
          size="large"
          disabled={aboutConsultReviews.some((review) => review.value === 0) || questionaryAnswers.length === 0}
          onClick={async () => {
            resolve();
          }}
        >
          評価してコンサルを終了
        </PrimaryButton>
      }
      closeButton={
        <TertiaryButton
          size="large"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          キャンセル
        </TertiaryButton>
      }
    >
      <div className="mx-4 mb-3 mt-6 lg:mx-6">
        <Heading>コンサルの評価</Heading>
        <p className="mt-6">
          評価を入力してコンサルを終了してください。
          <br />
          回答した医師に評価は公開されず、今後のサービス改善に使用します。
        </p>
        <div className="mt-4">
          {aboutConsultReviews.map((review) => {
            return <ReviewRating key={review.key} review={review} setReviews={setAboutConsultReviews} />;
          })}
        </div>
      </div>
      <div className="mb-3">
        <div className="mx-4 lg:mx-6">
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
        </div>
      </div>
    </Modal>
  );
};
