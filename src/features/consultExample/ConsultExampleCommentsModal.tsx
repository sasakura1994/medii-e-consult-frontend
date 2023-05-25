import React from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import { ModalTitleWithCloseButton } from '@/components/Parts/Modal/ModalTitleWithCloseButton';
import { Radio } from '@/components/Parts/Form/Radio';
import { useConsultExampleCommentModal } from './useConsultExampleCommentModal';
import { ExpandTextArea } from '@/components/Parts/Form/ExpandTextArea';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { ConsultExampleActions } from './ConsultExampleActions';
import { ConsultExampleDetailEntity } from '@/types/entities/ConsultExampleDetailEntity';
import { useConsultExampleActions } from './useConsultExampleActions';

export type CreateConsultExampleCommentData = {
  isAnonymous: boolean;
  body: string;
};

type Props = {
  consultExample: ConsultExampleDetailEntity;
  message: string;
  isSending: boolean;
  onCreate: (data: CreateConsultExampleCommentData) => void;
  onClose: () => void;
};

export const ConsultExampleCommentsModal: React.FC<Props> = ({
  consultExample,
  message,
  isSending,
  onCreate,
  onClose,
}: Props) => {
  const { body, isAnonymous, setBody, setIsAnonymous } =
    useConsultExampleCommentModal();
  const { likeAndMutate, unlikeAndMutate } = useConsultExampleActions(
    consultExample.example_id
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
        <p>{message}</p>
        <div className="mt-2">
          <ConsultExampleActions
            likeCount={consultExample.like_count}
            commentCount={consultExample.comment_count}
            isLiked={consultExample.is_liked}
            isCommentButtonHidden
            onLike={likeAndMutate}
            onUnlike={unlikeAndMutate}
          />
        </div>
        <div className="ml-2 mt-2 h-8 border-l-[3px] border-[#c4c4c4]"></div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onCreate({ isAnonymous, body });
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
            {isSending ? (
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
