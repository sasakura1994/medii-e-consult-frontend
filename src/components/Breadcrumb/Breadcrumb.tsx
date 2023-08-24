import React, { Children, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Breadcrumb = (props: Props) => {
  const { children } = props;

  const childrenArray = Children.toArray(children);

  return (
    <div className="flex items-center gap-2">
      {childrenArray.map((child, index) => (
        <>
          {child}
          {index < childrenArray.length - 1 && <img src="/icons/chevron.svg" alt="0" width="12" height="12" />}
        </>
      ))}
    </div>
  );
};
