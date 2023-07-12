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
      className="relative flex w-full flex-col lg:h-4/5 lg:w-3/5"
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
      <div className="relative flex h-full flex-col rounded-lg bg-white p-6 text-center">
        <div className="mx-auto mb-14 h-full w-4/5 overflow-y-auto">
          {page === 1 ? (
            <div className="h-[350px] w-full">
              <img
                src="images/top/tutorial1.png"
                alt="tutorial1"
                className="h-auto max-w-full"
              />
            </div>
          ) : page === 2 ? (
            <div className="h-[350px] w-full">
              <img
                src="images/top/tutorial2.png"
                className="h-auto max-w-full"
                alt="tutorial2"
              />
            </div>
          ) : (
            <div className="h-[350px] w-full">
              <img
                src="images/top/tutorial3.png"
                className="h-auto max-w-full"
                alt="tutorial3"
              />
            </div>
          )}
        </div>
        <div
          className="absolute bottom-0 right-0 left-0 mx-auto mb-4
        flex items-center justify-center space-x-4 text-2xl text-gray-400"
        >
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
