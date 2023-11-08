import { Modal } from '@/components/Parts/Modal/Modal';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import React, { useMemo, useState } from 'react';
import { KeyedMutator } from 'swr';
import { usePostResolveChatRoom } from '@/hooks/api/chat/usePostResolveChatRoom';
import { ReviewRating } from './ReviewRating';
import TextArea from '@/components/TextArea/TextArea';
import { Optional } from '@/components/Parts/Form/Optional';
import PrimaryButton from '@/components/Button/PrimaryButton';
import TertiaryButton from '@/components/Button/TertiaryButton';

export type Review = {
  key: string;
  label: string;
  lowRatingText: string;
  midiumRatingText: string;
  highRatingText: string;
  value: 0 | 1 | 2 | 3 | 4 | 5;
};

type ResolveChatRoomModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenReConsultSuggestionModal: React.Dispatch<React.SetStateAction<boolean>>;
  chatRoomData: FetchChatRoomResponseData;
  mutateChatRoom?: KeyedMutator<FetchChatRoomResponseData>;
  setSelectedTab: React.Dispatch<React.SetStateAction<'open' | 'close'>>;
};

export const ResolveChatRoomModal = (props: ResolveChatRoomModalProps) => {
  const { setIsOpen, setIsOpenReConsultSuggestionModal, chatRoomData, mutateChatRoom, setSelectedTab } = props;
  const [page, setPage] = useState<'aboutConsult' | 'aboutSystem'>('aboutConsult');
  const [aboutConsultReviews, setAboutConsultReviews] = useState<Review[]>([
    {
      key: '1',
      label: '期待通りの回答が得られましたか？',
      lowRatingText: '期待以下',
      midiumRatingText: '期待通り',
      highRatingText: '期待以上',
      value: 0,
    },
    {
      key: '2',
      label: '回答までの早さはいかがでしたか？',
      lowRatingText: '遅い',
      midiumRatingText: '期待通り',
      highRatingText: '早い',
      value: 0,
    },
    {
      key: '3',
      label: 'もう一度この先生に相談したいですか？',
      lowRatingText: 'したくない',
      midiumRatingText: 'どちらでもない',
      highRatingText: 'したい',
      value: 0,
    },
  ]);
  const [aboutSystemReviews, setAboutSystemReviews] = useState<Review[]>([
    {
      key: '1',
      label: 'E-コンサルの使い心地はいかがですか？',
      lowRatingText: '期待以下',
      midiumRatingText: '期待通り',
      highRatingText: '期待以上',
      value: 0,
    },
  ]);
  const [aboutConsultComment, setAboutConsultComment] = useState('');
  const [aboutSystemComment, setAboutSystemComment] = useState('');

  const { resolveChatRoom } = usePostResolveChatRoom();

  const title = useMemo(() => {
    if (chatRoomData.chat_room.room_type === 'GROUP') {
      return 'このグループの回答はいかがでしたか。';
    }
    if (chatRoomData.members.length > 0) {
      return chatRoomData.members[0].last_name + chatRoomData.members[0].first_name + '先生の回答はいかがでしたか。';
    }
    return 'このコンサルの回答はいかがでしたか。';
  }, [chatRoomData]);

  return (
    <Modal
      pcWidth="600"
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
            disabled={aboutSystemReviews.some((review) => review.value === 0)}
            onClick={async () => {
              await resolveChatRoom({
                chat_room_id: chatRoomData.chat_room.chat_room_id,
                comment: '',
                score: 5,
                system_comment: '',
              });
              await mutateChatRoom?.();
              setIsOpenReConsultSuggestionModal(true);
              setIsOpen(false);
              setSelectedTab('close');
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
          <p className="m-4 mt-6 text-center text-2xl font-semibold text-text-primary">{title}</p>
          <div className="mx-10">
            {aboutConsultReviews.map((review) => {
              return <ReviewRating key={review.key} review={review} setReviews={setAboutConsultReviews} />;
            })}
            <TextArea
              onChange={(e) => {
                setAboutConsultComment(e.target.value);
              }}
              value={aboutConsultComment}
              id="aboutConsult"
              name="aboutConsult"
              labelText="回答した医師へのコメント"
              placeholder="ご意見をお聞かせください。"
              className="mt-4 h-[72px] resize-none"
              labelBadge={<Optional>任意</Optional>}
            />
          </div>
        </div>
      ) : (
        <div className="mb-3">
          <p className="m-4 mt-6 text-center text-2xl font-semibold text-text-primary">
            E-コンサルについてご意見をお聞かせください。
          </p>
          <div className="mx-10">
            {aboutSystemReviews.map((review) => {
              return <ReviewRating key={review.key} review={review} setReviews={setAboutSystemReviews} />;
            })}
            <TextArea
              id="aboutSystem"
              name="aboutSystem"
              onChange={(e) => {
                setAboutSystemComment(e.target.value);
              }}
              value={aboutSystemComment}
              labelText="E-コンサルへのご意見・ご要望"
              placeholder="ご意見をお聞かせください。"
              className="mt-4 h-[72px] resize-none"
              labelBadge={<Optional>任意</Optional>}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};
