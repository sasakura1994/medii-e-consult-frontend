import React from 'react';

type LabelProps = {
  text: string;
};

const Label = (props: LabelProps) => {
  const { text } = props;
  return (
    <p
      className="my-auto mx-auto w-auto rounded-md bg-medii-blue-100 px-2 py-1
    text-center text-xs text-medii-blue-base"
    >
      {text}
    </p>
  );
};

export default Label;
