import React from 'react';
import PrimaryButtom from '../Button/Primary';

type InlineNotificationProps = {
  className?: string;
  text: string;
  ButtonText?: string;
  ButtonOnClick?: () => void;
};

export const InlineNotification = (props: InlineNotificationProps) => {
  const { className, text, ButtonText, ButtonOnClick } = props;
  return (
    <div
      className={
        `bg-medii-blue-100 p-4 lg:flex lg:items-center lg:justify-center ` +
        className
      }
    >
      <p className="flex-grow text-md text-text-primary">{text}</p>
      <div className="mt-2 lg:mt-0">
        <PrimaryButtom onClick={ButtonOnClick}>{ButtonText}</PrimaryButtom>
      </div>
    </div>
  );
};
