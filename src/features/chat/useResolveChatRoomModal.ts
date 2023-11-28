import { usePostResolveChatRoom } from '@/hooks/api/chat/usePostResolveChatRoom';
import { useFetchQuestionaryItemsForTransform } from '@/hooks/api/questionary/useFetchQuestionaryItemsForTransform';
import { usePostQuestionaryAnswers } from '@/hooks/api/questionary/usePostQuestionaryAnswers';
import { useState, useCallback, useMemo } from 'react';
import { ResolveChatRoomModalProps, Review } from './ResolveChatRoomModal';

export const useResolveChatRoomModal = (props: ResolveChatRoomModalProps) => {
  const { setIsOpen, setIsOpenReConsultConfirmModal, chatRoomData, mutateChatRoom, setSelectedTab } = props;
  const { questionaryItems } = useFetchQuestionaryItemsForTransform();
  const { postQuestionaryAnswers } = usePostQuestionaryAnswers();
  const [questionaryAnswers, setQuestionaryAnswers] = useState<number[]>([]);
  const [page, setPage] = useState<'aboutConsult' | 'aboutSystem'>('aboutConsult');
  const [aboutConsultReviews, setAboutConsultReviews] = useState<Review[]>([
    {
      key: 'quality_score',
      label: '回答は診療の助けになりましたか',
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
      label: 'また機会があれば、この先生に相談したいですか',
      lowRatingText: 'したくない',
      mediumRatingText: 'どちらでもない',
      highRatingText: 'したい',
      value: 0,
      isRequired: true,
    },
  ]);
  const [aboutSystemReviews, setAboutSystemReviews] = useState<Review[]>([
    {
      key: 'system_score',
      label: 'E-コンサルの使い心地はいかがですか？',
      lowRatingText: '期待以下',
      mediumRatingText: '期待通り',
      highRatingText: '期待以上',
      value: 0,
      isRequired: true,
    },
  ]);
  const [aboutSystemComment, setAboutSystemComment] = useState('');

  const { resolveChatRoom } = usePostResolveChatRoom();

  const resolve = useCallback(async () => {
    await resolveChatRoom({
      chat_room_id: chatRoomData.chat_room.chat_room_id,
      quality_score: aboutConsultReviews[0].value,
      speed_score: aboutConsultReviews[1].value,
      repeat_score: aboutConsultReviews[2].value,
      responder_comment: '',
      system_score: aboutSystemReviews[0].value,
      system_comment: aboutSystemComment,
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
    aboutSystemComment,
    aboutSystemReviews,
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

  const title = useMemo(() => {
    if (chatRoomData.chat_room.room_type === 'GROUP') {
      return 'このグループの回答はいかがでしたか。';
    }
    if (chatRoomData.members.length > 0) {
      return chatRoomData.members[0].last_name + chatRoomData.members[0].first_name + '先生の回答はいかがでしたか。';
    }
    return 'このコンサルの回答はいかがでしたか。';
  }, [chatRoomData]);
  return {
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
  };
};
