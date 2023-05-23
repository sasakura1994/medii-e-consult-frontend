import React, { useMemo } from 'react';
import { PaginationNumber } from './PaginationNumber';

type Props = {
  page?: number;
  url: string;
  maxPage: number;
};

export const Pagination: React.FC<Props> = ({
  url,
  maxPage,
  page = 1,
}: Props) => {
  const centerNumbers = useMemo(() => {
    const numbers = [];

    const minNumber = Math.max(page - 1, 2);
    const maxNumber = Math.min(page + 1, maxPage - 1);

    for (let i = minNumber; i <= maxNumber; i++) {
      numbers.push(i);
    }

    return numbers;
  }, [maxPage, page]);

  if (maxPage <= 1) {
    return <></>;
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <PaginationNumber page={1} isCurrent={page === 1} url={url} />
      {page > 3 && <div className="text-[#999999]">…</div>}
      {centerNumbers.map((number) => (
        <PaginationNumber
          key={number}
          page={number}
          isCurrent={page === number}
          url={url}
        />
      ))}
      {page < maxPage - 2 && <div className="text-[#999999]">…</div>}
      <PaginationNumber page={maxPage} isCurrent={page === maxPage} url={url} />
    </div>
  );
};
