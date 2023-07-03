import { News } from '@/hooks/api/medii/useNews';
import { dateFormat } from '@/libs/date';
import React from 'react';

type Props = {
  news: News;
};

export const TopNewsItem = (props: Props) => {
  const { news } = props;

  return (
    <a href={news.link} target="_blank" rel="noreferrer">
      <div className="flex gap-2 border-b py-4">
        <div className="flex flex-col-reverse lg:flex-col">
          <p className="text-md text-text-primary line-clamp-3">{news.title}</p>
          <p className="mt-1 text-medii-sm font-light text-text-secondary">
            {dateFormat(news.date, 'YYYY/MM/DD')}
          </p>
        </div>
        <div className="mr-2 shrink-0">
          <img className=" h-[60px] w-[88px]" src={news.cover} alt="" />
        </div>
      </div>
    </a>
  );
};
