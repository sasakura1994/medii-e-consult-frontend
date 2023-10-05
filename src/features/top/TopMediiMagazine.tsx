import React from 'react';
import { TopMediiMagazineItem } from './TopMediiMagazineItem';
import { useMediiMagazine } from '@/hooks/api/medii/useMediiMagazine';

export const TopMediiMagazine = () => {
  const { posts } = useMediiMagazine();

  return (
    <>
      <div className="flex items-center">
        <p className="flex-grow text-xxl font-bold text-text-primary">Medii Magazine</p>
        <a href="https://medii.jp/magazine/tag/consultant" target="_blank" rel="noreferrer">
          <button className="text-md text-text-secondary">もっと見る</button>
        </a>
      </div>
      {posts?.map((post) => (
        <TopMediiMagazineItem key={post.link} post={post} />
      ))}
    </>
  );
};
