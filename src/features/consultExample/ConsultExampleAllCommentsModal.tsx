import React from 'react';
import { Modal } from '@/components/Parts/Modal/Modal';
import { ModalTitleWithCloseButton } from '@/components/Parts/Modal/ModalTitleWithCloseButton';
import { ConsultExampleDetailEntity } from '@/types/entities/ConsultExampleDetailEntity';
import { useConsultExampleAllCommentsModal } from './useConsultExampleAllCommentsModal';
import { ConsultExampleComments } from './ConsultExampleComments';

type Props = {
  consultExample: ConsultExampleDetailEntity;
  onClose: () => void;
};

export const ConsultExampleAllCommentsModal: React.FC<Props> = ({
  consultExample,
  onClose,
}: Props) => {
  const { availableConsultExampleMessages, getCommentsForMessage } =
    useConsultExampleAllCommentsModal(consultExample.example_id);

  return (
    <Modal
      className="w-[644px]"
      setShowModal={(isShow) => (isShow ? null : onClose())}
    >
      <div className="border-b border-b-[#d5d5d5] px-20 pb-6 pt-10">
        <ModalTitleWithCloseButton
          title="事例内コメント一覧"
          onClose={onClose}
        />
      </div>
      {getCommentsForMessage(0).length > 0 && (
        <div className="px-20 pb-10 pt-5">
          <ConsultExampleComments
            consultExample={consultExample}
            consultExampleComments={getCommentsForMessage(0)}
            message={consultExample.background}
          />
        </div>
      )}
      {availableConsultExampleMessages.map((consultExampleMessage) => (
        <>
          <hr />
          <div className="px-20 pb-10 pt-5">
            <ConsultExampleComments
              consultExample={consultExample}
              consultExampleMessage={consultExampleMessage}
              consultExampleComments={getCommentsForMessage(
                consultExampleMessage.uid
              )}
              message={consultExampleMessage.message}
            />
          </div>
        </>
      ))}
    </Modal>
  );
};
