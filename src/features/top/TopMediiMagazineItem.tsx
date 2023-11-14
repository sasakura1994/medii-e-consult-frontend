import { MediiMagazinePost } from '@/hooks/api/medii/useMediiMagazine';
import { dateFormat } from '@/libs/date';
import React from 'react';

type Props = {
  post: MediiMagazinePost;
};

export const TopMediiMagazineItem = (props: Props) => {
  const { post } = props;

  return (
    <a href={post.link} target="_blank" rel="noreferrer">
      <div className="flex cursor-pointer gap-2 border-b py-4">
        <div className="w-[200px]">
          <p className="line-clamp-3 text-md text-text-primary">{post.title}</p>
          <p className="mt-1 text-medii-sm font-light text-text-secondary">{dateFormat(post.date, 'YYYY/MM/DD')}</p>
        </div>
        <div className="mr-2">
          <img className="h-[60px] w-[88px] object-cover" src={post.cover} alt="" />
        </div>
      </div>
    </a>
  );
};
