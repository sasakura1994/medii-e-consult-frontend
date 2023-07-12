import { Modal } from '@/components/Parts/Modal/Modal';
import React from 'react';
import { useTutorialExplanation } from './useTutorialExplanation';

type TutorialExplanationProps = {
  setShowModal: (isShow: boolean) => void;
};

const TutorialExplanation = (props: TutorialExplanationProps) => {
  const { setShowModal } = props;
  const { page, next, back } = useTutorialExplanation();

  return (
    <Modal
      className="relative flex w-full flex-col lg:max-h-[90%] lg:w-1/2"
      setShowModal={setShowModal}
      isCenter
    >
      <div
        className="mr-9 mt-5 flex cursor-pointer flex-row-reverse"
        onClick={() => {
          setShowModal(false);
        }}
      >
        <img src="icons/close_primary.svg" alt="" />
      </div>
      <div className="relative flex h-full flex-col rounded-lg bg-white px-6 py-2 text-center">
        {page === 1 ? (
          <img src="images/top/tutorial1.png" alt="tutorial1" />
        ) : page === 2 ? (
          <img src="images/top/tutorial2.png" alt="tutorial2" />
        ) : (
          <img src="images/top/tutorial3.png" alt="tutorial3" />
        )}

        <div className="mx-auto mb-4 flex items-center justify-center space-x-4 text-2xl text-gray-400">
          {page !== 1 ? (
            <img
              onClick={back}
              className="h-[39px] cursor-pointer"
              src="icons/arrow_left_enable.svg"
              alt="arrow_left_enable"
            />
          ) : (
            <img
              className="h-[39px]"
              src="icons/arrow_left_disable.svg"
              alt="arrow_left_disable"
            />
          )}
          <span>{page}/3</span>
          {page !== 3 ? (
            <img
              onClick={next}
              className="h-[39px] cursor-pointer"
              src="icons/arrow_right_enable.svg"
              alt="arrow_right_enable"
            />
          ) : (
            <img
              className="h-[39px]"
              src="icons/arrow_right_disable.svg"
              alt="arrow_right_disable"
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TutorialExplanation;
