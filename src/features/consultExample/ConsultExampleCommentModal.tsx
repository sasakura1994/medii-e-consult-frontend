import React from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import { ModalTitleWithCloseButton } from '@/components/Parts/Modal/ModalTitleWithCloseButton';
import { Radio } from '@/components/Parts/Form/Radio';
import { useConsultExampleCommentModal } from './useConsultExampleCommentModal';
import { ExpandTextArea } from '@/components/Parts/Form/ExpandTextArea';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';

export type CreateConsultExampleCommentData = {
  isAnonymous: boolean;
  body: string;
};

type Props = {
  consultExampleId: string;
  consultExampleMessageId: number;
  message: string;
  onClose: () => void;
};

export const ConsultExampleCommentModal: React.FC<Props> = ({
  consultExampleId,
  consultExampleMessageId,
  message,
  onClose,
}: Props) => {
  const {
    body,
    createComment,
    createCommentForMessage,
    isAnonymous,
    isCommentSending,
    isCompleted,
    setBody,
    setIsAnonymous,
  } = useConsultExampleCommentModal(consultExampleId);

  return (
    <Modal
      className="w-[644px]"
      setShowModal={(isShow) => (isShow ? null : onClose())}
    >
      <div className="border-b border-b-[#d5d5d5] px-20 pb-6 pt-10">
        <ModalTitleWithCloseButton title="コメントする" onClose={onClose} />
      </div>
      <div className="px-20 pb-10 pt-5">
        <p>{message}</p>
        <div className="ml-2 mt-2 h-8 border-l-[3px] border-[#c4c4c4]"></div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (consultExampleMessageId === 0) {
              createComment();
            } else {
              createCommentForMessage(consultExampleMessageId);
            }
          }}
        >
          <div className="mt-2 flex gap-4">
            <div>
              <Radio
                id="is-anonymous-false"
                name="is_anonymous"
                value="0"
                checked={!isAnonymous}
                onChange={() => setIsAnonymous(false)}
              />
              <label htmlFor="is-anonymous-false">実名で投稿</label>
            </div>
            <div>
              <Radio
                id="is-anonymous-true"
                name="is_anonymous"
                value="1"
                checked={isAnonymous}
                onChange={() => setIsAnonymous(true)}
              />
              <label htmlFor="is-anonymous-true">匿名で投稿</label>
            </div>
          </div>
          <div className="mt-1">
            <ExpandTextArea
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="min-h-[4rem]"
              placeholder="コメントする"
              required
            />
          </div>
          <div className="mt-2 flex justify-end">
            {isCommentSending ? (
              <SpinnerBorder />
            ) : (
              <PrimaryButton
                type="submit"
                className="flex items-center rounded px-5"
              >
                <img src="/icons/send.svg" alt="" />
                <div className="font-normal">投稿</div>
              </PrimaryButton>
            )}
          </div>
          {isCompleted && (
            <div className="mt-2">
              <ErrorMessage className="text-center">
                コメントを投稿しました。
              </ErrorMessage>
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
};
