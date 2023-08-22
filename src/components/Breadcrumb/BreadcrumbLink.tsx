import React, { ReactNode } from 'react';
import { BreadcrumbItem } from './BreadcrumbItem';
import Link from 'next/link';

type Props = {
  children: ReactNode;
  href: string;
};

export const BreadcrumbLink = (props: Props) => {
  const { children, href } = props;

  return (
    <BreadcrumbItem>
      <Link href={href}>
        <a className="hover:underline">{children}</a>
      </Link>
    </BreadcrumbItem>
  );
};
