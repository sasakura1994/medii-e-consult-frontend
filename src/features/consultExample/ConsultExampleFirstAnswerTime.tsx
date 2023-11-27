import React from 'react';

type Props = {
  firstAnswerMinutes: number;
  isLarge?: boolean;
};

export const ConsultExampleFirstAnswerTime: React.FC<Props> = ({ firstAnswerMinutes }: Props) => {
  const minutes = firstAnswerMinutes % 60;
  const hours = (firstAnswerMinutes - minutes) / 60;

  return (
    <div className="flex flex-col items-center justify-end gap-1 text-right font-bold text-primary">
      <div className="text-[11px]">初回回答まで</div>
      <div className="flex justify-end text-sm">
        <p className="whitespace-nowrap text-base">{hours}時間</p>
        <p className="whitespace-nowrap text-base">{minutes}分</p>
      </div>
    </div>
  );
};
