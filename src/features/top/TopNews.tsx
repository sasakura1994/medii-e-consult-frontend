import React from 'react';
import { useNews } from '@/hooks/api/medii/useNews';
import { TopNewsItem } from './TopNewsItem';

export const TopNews = () => {
  const { newsList } = useNews();

  return (
    <>
      <div className="flex items-center">
        <p className="flex-grow text-xxl font-bold text-text-primary">お知らせ</p>
        <a href="https://medii.jp/news/" target="_blank" rel="noreferrer">
          <button className="text-md text-text-secondary">すべてのお知らせ</button>
        </a>
      </div>
      {newsList?.map((news) => <TopNewsItem key={news.title} news={news} />)}
    </>
  );
};
