import React from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';
import SecondaryButton from '@/components/Button/SecondaryButton';

type Props = {
  errorMessage?: string;
  isSending: boolean;
  onSubmit: () => void;
  setShowModal: (isShow: boolean) => void;
};

export const AssignConfirmationModal: React.FC<Props> = ({
  errorMessage,
  isSending,
  onSubmit,
  setShowModal,
}: Props) => {
  return (
    <Modal setShowModal={setShowModal} className="lg:w-[644px]">
      <div className="mx-6 my-10 flex h-[400px] items-center justify-center lg:mx-20 lg:my-4">
        <div>
          <div className="text-center text-2xl font-bold">本コンサルの回答医として担当しますか？</div>
          <p className="mt-4 text-center">
            担当いただきましたら、お早めに質問医にメッセージをお送りいただけますと幸甚に存じます。
          </p>
          {!isSending ? (
            <>
              <div className="mt-[60px] flex flex-col gap-10 px-6 lg:flex-row-reverse lg:gap-4 lg:px-0">
                <PrimaryButton
                  type="button"
                  size="large"
                  className="mx-12 lg:mx-0 lg:w-full lg:flex-1 lg:break-keep"
                  onClick={onSubmit}
                >
                  回答医として担当する
                </PrimaryButton>
                <SecondaryButton
                  type="button"
                  size="large"
                  className="mx-12 lg:mx-0 lg:w-full lg:flex-1 lg:break-keep"
                  onClick={() => setShowModal(false)}
                >
                  戻る
                </SecondaryButton>
              </div>
              {errorMessage && <ErrorMessage className="mt-8 text-center">{errorMessage}</ErrorMessage>}
            </>
          ) : (
            <div className="mt-8 flex justify-center">
              <SpinnerBorder />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
