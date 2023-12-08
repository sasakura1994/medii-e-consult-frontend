import { useRef, useState, useEffect } from 'react';

// 閾値は320px
const MAX_WIDTH = 320;

export const useModalFooter = () => {
  const closeButtonRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLDivElement>(null);
  const [isOverMaxWidth, setIsOverMaxWidth] = useState(false);

  useEffect(() => {
    // ボタンの幅をチェックし、条件に基づいてflex-directionを設定する
    const checkButtonWidth = () => {
      const closeBtnWidth = closeButtonRef.current ? closeButtonRef.current.offsetWidth : 0;
      const submitBtnWidth = submitButtonRef.current ? submitButtonRef.current.offsetWidth : 0;
      console.log(closeBtnWidth, submitBtnWidth);

      if (closeBtnWidth + submitBtnWidth > MAX_WIDTH) {
        setIsOverMaxWidth(true);
      } else {
        setIsOverMaxWidth(false);
      }
    };
    window.addEventListener('resize', checkButtonWidth);
    checkButtonWidth();
    return () => {
      window.removeEventListener('resize', checkButtonWidth);
    };
  }, []);

  return {
    closeButtonRef,
    submitButtonRef,
    isOverMaxWidth,
  };
};
