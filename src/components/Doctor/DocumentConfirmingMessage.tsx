import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export const DocumentConfirmingMessage = (props: Props) => {
  const { children } = props;

  return (
    <div className="w-full bg-[#ffc961] py-2 text-center" data-testid="document-confirming-message">
      <div className="text-[14px] font-bold">ご提出いただいた医師情報の確認中です</div>
      {children && <div className="text-[11px]">{children}</div>}
    </div>
  );
};
