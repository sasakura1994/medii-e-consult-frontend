import { Modal } from '@/components/Parts/Modal/Modal';
import React, { useState } from 'react';

const TutorialExplanation = () => {
  const [page, setPage] = useState(1);

  const next = () => {
    setPage(page + 1);
    console.log('next:' + (page + 1));
  };

  const back = () => {
    setPage(page - 1);
    console.log('back:' + (page - 1));
  };

  return (
    <Modal className="w-3/5">
      <div className="flex flex-col rounded-lg bg-white p-6 text-center">
        {page === 1 ? (
          <img
            src="images/top/tutorial1.png"
            className="h-auto max-w-full"
            alt="tutorial1"
          />
        ) : page === 2 ? (
          <img
            src="images/top/tutorial2.png"
            className="h-auto max-w-full"
            alt="tutorial2"
          />
        ) : page === 3 ? (
          <img
            src="images/top/tutorial3.png"
            className="h-auto max-w-full"
            alt="tutorial3"
          />
        ) : (
          <div className="relative overflow-y-scroll">
            <img
              src="images/top/tutorial4.png"
              className="h-auto max-w-full"
              alt="tutorial4"
            />
            <div className="absolute bottom-0 left-0 flex h-full w-full items-end justify-center">
              <img
                onClick={() => setPage(1)}
                className="h-[64px] max-w-[80%] cursor-pointer"
                src="icons/start_tutorial.svg"
                alt="start_tutorial"
              />
            </div>
          </div>
        )}
        <div className="inline-flex items-center justify-center space-x-4 text-2xl text-gray-400">
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
          <span>{page}/4</span>
          {page !== 4 ? (
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
