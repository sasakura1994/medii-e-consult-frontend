import PrimaryButton from '@/components/Button/PrimaryButton';
import TertiaryButton from '@/components/Button/TertiaryButton';
import { Modal } from '@/components/Parts/Modal/Modal';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { useFetchQuestionaryItemsForTransform } from '@/hooks/api/questionary/useFetchQuestionaryItemsForTransform';
import { usePostQuestionaryAnswers } from '@/hooks/api/questionary/usePostQuestionaryAnswers';
import React, { useState } from 'react';
type Props = {
  setIsOpen: (isOpen: boolean) => void;
  chatRoomData: FetchChatRoomResponseData;
  setIsOpenReConsultConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const QuestionaryModal = (props: Props) => {
  const { setIsOpen, chatRoomData, setIsOpenReConsultConfirmModal } = props;
  const { questionaryItems } = useFetchQuestionaryItemsForTransform();
  const { postQuestionaryAnswers } = usePostQuestionaryAnswers();
  const [questionaryAnswers, setQuestionaryAnswers] = useState<number[]>([]);
  return (
    <Modal
      pcWidth="600"
      isUseFooter
      className="px-16 pb-3 pt-8"
      submitButton={
        <PrimaryButton
          disabled={questionaryAnswers.length === 0}
          onClick={async () => {
            await postQuestionaryAnswers({
              answer_ids: questionaryAnswers,
              room_id: chatRoomData.chat_room.chat_room_id,
              question_type: 'Transform',
            });
            if (chatRoomData.chat_room.room_type !== 'GROUP') {
              setIsOpenReConsultConfirmModal(true);
            }
            setIsOpen(false);
          }}
        >
          送信
        </PrimaryButton>
      }
      closeButton={
        <TertiaryButton
          onClick={() => {
            if (chatRoomData.chat_room.room_type !== 'GROUP') {
              setIsOpenReConsultConfirmModal(true);
            }
            setIsOpen(false);
          }}
        >
          回答しない
        </TertiaryButton>
      }
    >
      <div className="border-b border-[#d5d5d5] p-4">
        <p className="text-center text-sm text-block-gray">解決済みとしてルームを閉じます</p>
        <p className="text-center text-2xl font-semibold">アンケートのご協力をお願い致します</p>
      </div>
      <p className="my-4 text-center font-semibold">
        コンサルを経て、当該症例に対する現在のお考えをお聞かせください（複数選択可）
      </p>
      {questionaryItems &&
        questionaryItems.map((questionaryItem) => (
          <div className="ml-2 mt-1 flex items-center" key={questionaryItem.id}>
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
    </Modal>
  );
};
