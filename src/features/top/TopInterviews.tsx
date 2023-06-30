import React from 'react';
import { TopArticle } from './TopArticle';

export const TopInterviews = () => {
  return (
    <>
      <div className="flex items-center">
        <p className="flex-grow text-xxl font-bold text-text-primary">
          活用事例
        </p>
        <a
          href="https://note.com/medii_ecns/m/mc775b94f3819"
          target="_blank"
          rel="noreferrer"
        >
          <button className="text-md text-text-secondary">もっと見る</button>
        </a>
      </div>
      <TopArticle />
      <TopArticle />
    </>
  );
};
