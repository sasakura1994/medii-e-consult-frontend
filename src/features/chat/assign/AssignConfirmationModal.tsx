import React from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { GrayButton } from '@/components/Parts/Button/GrayButton';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';
import { ErrorMessage } from '@/components/Parts/Text/ErrorMessage';

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
      <div className="my-10 mx-6 flex h-[400px] items-center justify-center lg:my-4 lg:mx-20">
        <div>
          <div className="text-center text-2xl font-bold">
            本コンサルの回答医として担当しますか？
          </div>
          <p className="mt-4 text-center">
            担当後は速やかに質問医にメッセージを送ってください。
          </p>
          {!isSending ? (
            <>
              <div className="mt-[60px] flex flex-col gap-10 lg:flex-row-reverse lg:gap-4">
                <PrimaryButton
                  type="button"
                  size="lg"
                  className="w-full flex-1 break-keep"
                  onClick={onSubmit}
                >
                  回答医として担当する
                </PrimaryButton>
                <GrayButton
                  type="button"
                  size="lg"
                  className="w-full flex-1 break-keep"
                  onClick={() => setShowModal(false)}
                >
                  戻る
                </GrayButton>
              </div>
              {errorMessage && (
                <ErrorMessage className="mt-8 text-center">
                  {errorMessage}
                </ErrorMessage>
              )}
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
