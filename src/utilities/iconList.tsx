import React from 'react';

type IconListType = {
  [key: string]: React.ReactElement;
};

export const IconList = (name: string, style: string): React.ReactElement => {
  const icons: IconListType = {
    sample: <></>,
  };

  return icons[name];
};
