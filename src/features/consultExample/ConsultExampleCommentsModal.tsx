import React from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import { ModalTitleWithCloseButton } from '@/components/Parts/Modal/ModalTitleWithCloseButton';
import { Radio } from '@/components/Parts/Form/Radio';
import { ExpandTextArea } from '@/components/Parts/Form/ExpandTextArea';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { ConsultExampleDetailEntity } from '@/types/entities/ConsultExampleDetailEntity';
import { useConsultExampleCommentsModal } from './useConsultExampleCommentsModal';
import { ConsultExampleComments } from './ConsultExampleComments';

type Props = {
  consultExample: ConsultExampleDetailEntity;
  consultExampleMessageId?: number;
  message: string;
  onClose: () => void;
};

export const ConsultExampleCommentsModal: React.FC<Props> = ({
  consultExample,
  consultExampleMessageId,
  message,
  onClose,
}: Props) => {
  const {
    consultExampleComments,
    consultExampleMessage,
    createCommentAndMutate,
    createCommentForMessageAndMutate,
    body,
    isAnonymous,
    isCommentSending,
    setBody,
    setIsAnonymous,
  } = useConsultExampleCommentsModal(
    consultExample.example_id,
    consultExampleMessageId
  );

  return (
    <Modal
      className="w-[644px]"
      setShowModal={(isShow) => (isShow ? null : onClose())}
    >
      <div className="border-b border-b-[#d5d5d5] px-20 pb-6 pt-10">
        <ModalTitleWithCloseButton title="コメント一覧" onClose={onClose} />
      </div>
      <div className="px-20 pb-10 pt-5">
        <ConsultExampleComments
          consultExample={consultExample}
          consultExampleMessage={consultExampleMessage}
          consultExampleComments={consultExampleComments || []}
          message={message}
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (consultExampleMessageId) {
              createCommentForMessageAndMutate();
            } else {
              createCommentAndMutate();
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
        </form>
      </div>
    </Modal>
  );
};
