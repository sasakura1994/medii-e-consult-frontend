import Link from 'next/link';
import React from 'react';

type Props = {
  page: number;
  url: string;
  isCurrent: boolean;
};

export const PaginationNumber: React.FC<Props> = ({ page, url, isCurrent }: Props) => {
  const pagedUrl = page === 1 ? url : `${url}?page=${page}`;

  if (isCurrent) {
    return <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">{page}</div>;
  }

  return (
    <Link href={pagedUrl} className="font-bold text-[#999999]">
      {page}
    </Link>
  );
};
