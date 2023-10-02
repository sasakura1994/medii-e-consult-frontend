import React from 'react';
import PrimaryButtom from '../Button/PrimaryButton';

type InlineNotificationProps = {
  className?: string;
  text: string;
  dataTestId: string;
  buttonText?: string;
  buttonOnClick?: () => void;
};

export const InlineNotification = (props: InlineNotificationProps) => {
  const { className, dataTestId, text, buttonText, buttonOnClick } = props;
  return (
    <div
      className={`gap-4 bg-medii-blue-100 p-4 lg:flex lg:items-center lg:justify-center ${className ?? ''}`}
      data-testid={dataTestId}
    >
      <p className="flex-grow text-md text-text-primary">{text}</p>
      {buttonText && (
        <div className="mt-2 whitespace-nowrap lg:mt-0 ">
          <PrimaryButtom size="large" onClick={buttonOnClick}>
            {buttonText}
          </PrimaryButtom>
        </div>
      )}
    </div>
  );
};
