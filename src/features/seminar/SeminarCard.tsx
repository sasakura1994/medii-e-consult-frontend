import { SeminarEntityType } from '@/types/entities/seminarEntity';
import React from 'react';

type Props = {
  seminar: SeminarEntityType;
};

export const SeminarCard: React.FC<Props> = ({ seminar }: Props) => {
  return (
    <div className="w-[374px] rounded-2xl border bg-white  shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] mb-2 m-auto">
      <a className="block p-6" href={`/seminar/${seminar.seminar_id}`}>
        <div className="w-full">
          <img src={seminar.image_url} className="aspect-video w-full" alt="" />
          <div
            className={`relative mt-8 w-full rounded-md ${
              seminar.movie_url ? 'bg-primary' : 'bg-[#f5847d]'
            } p-2 text-white`}
          >
            <p className="pl-10 text-center text-sm lg:pl-8 lg:text-base">
              {seminar.movie_url
                ? '閲覧可能です'
                : '閲覧にチケット1枚が必要です'}
            </p>
            <div
              className={`absolute top-0 bottom-0 left-2 m-auto flex h-14 w-14 items-center justify-center 
              rounded-full ${
                seminar.movie_url ? 'bg-primary' : 'bg-[#f5847d]'
              }`}
            >
              <img src="images/seminar/key_locked.svg" alt="" />
            </div>
          </div>
          <div className="lg:mx-3">
            <p className="mt-4 h-12 font-bold">{seminar.subject}</p>
            <dl className="grid grid-cols-[3rem_auto] gap-x-2 text-sm lg:mt-6 lg:mb-4 lg:gap-y-4">
              <dt className="pr-4 font-bold text-primary">講師</dt>
              <dd className="whitespace-pre-wrap text-sm">
                {seminar.doctor_name}先生
              </dd>
              <dt className="pr-4 font-bold text-primary">概要</dt>
              <dd className="h-10 text-sm line-clamp-2">
                {seminar.description}
              </dd>
            </dl>
          </div>
        </div>
      </a>
    </div>
  );
};
