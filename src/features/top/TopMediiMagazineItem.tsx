import React from 'react';

export type Interview = {
  title: string;
  url: string;
  medicalSpeciality: string;
  doctorName: string;
  thumbnailUrl: string;
};

type Props = {
  interview: Interview;
};

export const TopMediiMagazineItem = (props: Props) => {
  const { interview } = props;

  return (
    <a href={interview.url} target="_blank" rel="noreferrer">
      <div className="flex cursor-pointer gap-2 border-b py-4">
        <div className="w-[200px]">
          <p className="text-md text-text-primary line-clamp-3">{interview.title}</p>
          <p className="mt-1 text-sm font-light text-text-secondary">{interview.medicalSpeciality}</p>
          <p className="text-sm font-light text-text-secondary">{interview.doctorName}</p>
        </div>
        <div className="mr-2">
          <img className="h-[60px] w-[88px] object-cover" src={interview.thumbnailUrl} alt="" />
        </div>
      </div>
    </a>
  );
};
