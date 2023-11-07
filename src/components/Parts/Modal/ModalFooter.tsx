import React, { ReactNode, useEffect, useRef, useState } from 'react';

export type ModalFooterProps = {
  isUseFooter?: boolean;
  closeButton?: ReactNode;
  submitButton?: ReactNode;
};

export const ModalFooter = (props: ModalFooterProps) => {
  const { isUseFooter = false, closeButton, submitButton } = props;
  const closeButtonRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLDivElement>(null);
  const [flexDirection, setFlexDirection] = useState<'flex-row' | 'flex-col-reverse'>('flex-row');

  useEffect(() => {
    // ボタンの幅をチェックし、条件に基づいてflex-directionを設定する
    const checkButtonWidth = () => {
      const closeBtnWidth = closeButtonRef.current ? closeButtonRef.current.offsetWidth : 0;
      const submitBtnWidth = submitButtonRef.current ? submitButtonRef.current.offsetWidth : 0;

      // 閾値は320px
      const maxWidth = 320;

      if (closeBtnWidth > maxWidth || submitBtnWidth > maxWidth) {
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

  if (!isUseFooter) return <></>;
  return (
    <div className={'flex justify-center gap-2 self-stretch p-4 lg:justify-end ' + flexDirection}>
      <div ref={closeButtonRef}>{closeButton}</div>
      <div ref={submitButtonRef}>{submitButton}</div>
    </div>
  );
};
