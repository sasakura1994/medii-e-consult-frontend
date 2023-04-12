import { SeminarEntityType } from '@/types/entities/seminarEntity';
import React from 'react';

type Props = {
  seminar: SeminarEntityType;
};

export const SeminarCard: React.FC<Props> = ({ seminar }: Props) => {
  return (
    <div className="rounded-2xl border bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <a className="block p-6" href={`/seminar/${seminar.seminar_id}`}>
        <div className="w-full">
          <img src={seminar.image_url} className="w-full" />
          <div className="relative mt-8 w-full rounded-md bg-[#f5847d] p-2 text-white">
            <p className="pl-10 text-center text-sm lg:pl-8 lg:text-base">
              閲覧にチケット1枚が必要です
            </p>
            <div className="absolute bottom-0 left-2 top-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f5847d]">
              <img src="/images/seminar/key_locked.svg" />
            </div>
          </div>
          <div className="lg:mx-3">
            <p className="mt-4 h-12 font-bold">{seminar.subject}</p>
            <dl className="grid grid-cols-[3rem_auto] gap-x-2 text-sm lg:mt-6 lg:mb-4 lg:gap-y-4">
              <dt className="pr-4 font-bold text-primary">講師</dt>
              <dd className="text-sm">{seminar.doctor_name}先生</dd>
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