import { Required } from '@/components/Parts/Form/Required';
import Label from '@/components/Parts/Label/Label';
import React from 'react';

type Props = {
  children?: string | JSX.Element;
  required?: boolean;
  id?: string;
};

export const EditProfileLabel = (props: Props) => {
  const { children, required, id } = props;

  if (!children) {
    return <></>;
  }

  return (
    <label htmlFor={id} className="mb-2 flex items-center gap-2 font-bold">
      <div>{children}</div>
      {required === true ? (
        <Required>必須</Required>
      ) : (
        <Label color="gray" size="sm">
          任意
        </Label>
      )}
    </label>
  );
};
