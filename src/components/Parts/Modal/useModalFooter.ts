import { useRef, useState, useEffect } from 'react';

// 閾値は320px
const MAX_WIDTH = 320;

export const useModalFooter = () => {
  const closeButtonRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLDivElement>(null);
  const [flexDirection, setFlexDirection] = useState<'flex-row' | 'flex-col-reverse'>('flex-row');

  useEffect(() => {
    // ボタンの幅をチェックし、条件に基づいてflex-directionを設定する
    const checkButtonWidth = () => {
      const closeBtnWidth = closeButtonRef.current ? closeButtonRef.current.offsetWidth : 0;
      const submitBtnWidth = submitButtonRef.current ? submitButtonRef.current.offsetWidth : 0;

      if (closeBtnWidth > MAX_WIDTH || submitBtnWidth > MAX_WIDTH) {
        setFlexDirection('flex-col-reverse');
      } else {
        setFlexDirection('flex-row');
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
    flexDirection,
  };
};
