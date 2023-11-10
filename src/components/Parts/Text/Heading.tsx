import React, { ElementType, ReactNode } from 'react';

type TagName = 'h1' | 'h2' | 'h3' | 'h4';

type Props = {
  as?: TagName;
  children: ReactNode;
  className?: string;
};

const fontSizes: { [key: string]: string } = {
  h1: 'text-2xl',
  h2: 'text-xl',
  h3: 'text-lg',
  h4: 'text-base',
};

export const Heading = (props: Props) => {
  const { as: asProps = 'h1', children, className } = props;

  const CustomTag = asProps as ElementType;
  const fontSize = fontSizes[asProps];

  return <CustomTag className={`${fontSize} font-semibold leading-6 ${className ?? ''}`}>{children}</CustomTag>;
};
