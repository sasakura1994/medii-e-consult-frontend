import Link from 'next/link';
import React, { ComponentProps } from 'react';

type Props = ComponentProps<typeof Link>;

export const HeaderMyPageMenuItem = (props: Props) => {
  const { children, className, href, target, onClick, ...otherProps } = props;

  return (
    <Link
      href={href}
      {...otherProps}
      target={target}
      className={`block px-6 py-2 ${className ?? ''}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
