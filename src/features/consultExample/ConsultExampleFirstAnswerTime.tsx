import React from 'react';

type Props = {
  firstAnswerMinutes: number;
};

export const ConsultExampleFirstAnswerTime: React.FC<Props> = ({
  firstAnswerMinutes,
}: Props) => {
  const minutes = firstAnswerMinutes % 60;
  const hours = (firstAnswerMinutes - minutes) / 60;

  return (
    <div className="flex items-center gap-1 font-bold text-primary">
      <div className="text-[11px]">初回回答まで</div>
      <div className="text-xm">
        <span className="text-base">{hours}</span>時間
        <span className="text-base">{minutes}</span>分
      </div>
    </div>
  );
};
