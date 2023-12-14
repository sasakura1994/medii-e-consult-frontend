import { usePostResolveChatRoom } from '@/hooks/api/chat/usePostResolveChatRoom';
import { useFetchQuestionaryItemsForTransform } from '@/hooks/api/questionary/useFetchQuestionaryItemsForTransform';
import { usePostQuestionaryAnswers } from '@/hooks/api/questionary/usePostQuestionaryAnswers';
import { useState, useCallback } from 'react';
import { ResolveChatRoomModalProps, Review } from './ResolveChatRoomModal';

export const useResolveChatRoomModal = (props: ResolveChatRoomModalProps) => {
  const { setIsOpen, setIsOpenReConsultConfirmModal, chatRoomData, mutateChatRoom, setSelectedTab } = props;
  const { questionaryItems } = useFetchQuestionaryItemsForTransform();
  const { postQuestionaryAnswers } = usePostQuestionaryAnswers();
  const [questionaryAnswers, setQuestionaryAnswers] = useState<number[]>([]);
  const [aboutConsultReviews, setAboutConsultReviews] = useState<Review[]>([
    {
      key: 'quality_score',
      label: '先生の回答は診療の助けになりましたか',
      lowRatingText: '期待以下',
      mediumRatingText: '期待通り',
      highRatingText: '期待以上',
      value: 0,
      isRequired: true,
    },
    {
      key: 'speed_score',
      label: '回答までの早さはいかがでしたか',
      lowRatingText: '遅い',
      mediumRatingText: '期待通り',
      highRatingText: '早い',
      value: 0,
      isRequired: true,
    },
    {
      key: 'repeat_score',
      label: 'また機会があれば、今回担当いただいた先生に相談したいですか',
      lowRatingText: 'したくない',
      mediumRatingText: 'どちらでもない',
      highRatingText: 'したい',
      value: 0,
      isRequired: true,
    },
  ]);

  const { resolveChatRoom } = usePostResolveChatRoom();

  const resolve = useCallback(async () => {
    await resolveChatRoom({
      chat_room_id: chatRoomData.chat_room.chat_room_id,
      quality_score: aboutConsultReviews[0].value,
      speed_score: aboutConsultReviews[1].value,
      repeat_score: aboutConsultReviews[2].value,
      responder_comment: '',
    });
    await postQuestionaryAnswers({
      answer_ids: questionaryAnswers,
      room_id: chatRoomData.chat_room.chat_room_id,
      question_type: 'Transform',
    });
    if (chatRoomData.chat_room.room_type !== 'GROUP') {
      setIsOpenReConsultConfirmModal(true);
    }
    await mutateChatRoom?.();
    setIsOpen(false);
    setSelectedTab('close');
  }, [
    aboutConsultReviews,
    chatRoomData.chat_room.chat_room_id,
    chatRoomData.chat_room.room_type,
    mutateChatRoom,
    postQuestionaryAnswers,
    questionaryAnswers,
    resolveChatRoom,
    setIsOpen,
    setIsOpenReConsultConfirmModal,
    setSelectedTab,
  ]);

  return {
    aboutConsultReviews,
    setAboutConsultReviews,
    resolve,
    questionaryItems,
    questionaryAnswers,
    setQuestionaryAnswers,
  };
};
