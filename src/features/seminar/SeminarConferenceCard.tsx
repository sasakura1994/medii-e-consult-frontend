import PrimaryButton from '@/components/Button/PrimaryButton';
import TertiaryButton from '@/components/Button/TertiaryButton';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import React, { useMemo, useState } from 'react';

type SeminarConferenceCardProps = {
  seminar: SeminarEntityType;
  index: number;
};

export const SeminarConferenceCard = (props: SeminarConferenceCardProps) => {
  const { seminar, index } = props;
  const [isOpened, setIsOpened] = useState(false);

  const dateTime = useMemo(() => {
    const seminarDate = new Date(seminar.seminar_date);
    const time = seminar.seminar_start_time.substring(0, 5);
    return `${seminarDate.getFullYear()}/${seminarDate.getMonth() + 1}/${seminarDate.getDate()} ${time}`;
  }, [seminar.seminar_date, seminar.seminar_start_time]);
  if (index === 0) {
    return (
      <div
        className="mt-6 flex h-auto w-[343px] flex-wrap items-start rounded-lg
      bg-white p-4 shadow-high lg:w-[928px] lg:p-0"
      >
        <img alt="" src={seminar.image_url} className="w-[327px] object-contain lg:m-4 lg:w-[424px]" />
        <div className="ml-0 w-full lg:m-4 lg:w-[440px]">
          <div className="mt-1 flex items-center">
            <p className="text-md">{dateTime}</p>
            <div className="ml-3 w-full whitespace-nowrap lg:ml-5 lg:w-auto">
              <a href={seminar.zoom_url} target="_blank" rel="noreferrer">
                <PrimaryButton>E-カンファに事前登録</PrimaryButton>
              </a>
            </div>
          </div>
          <p className="mt-3 text-md font-bold">概要</p>
          <p
            className={
              !isOpened
                ? 'mt-1 line-clamp-4 text-ellipsis whitespace-pre-wrap text-md lg:line-clamp-5'
                : 'mt-1 whitespace-pre-wrap text-md'
            }
          >
            {seminar.description}
          </p>
          <div className="mt-2 flex justify-center">
            <TertiaryButton
              onClick={() => {
                setIsOpened((prev) => !prev);
              }}
            >
              <p className="text-medii-sm font-bold">{isOpened ? '閉じる' : 'もっと読む'}</p>
            </TertiaryButton>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mr-4 mt-6 h-auto w-[343px] rounded-lg bg-white p-4 shadow-high lg:w-[456px]">
      <img alt="" className="w-[327px] object-contain lg:w-[424px]" src={seminar.image_url} />
      <div className="mt-2 h-auto w-full">
        <div className="flex items-center">
          <p className="text-md">{dateTime}</p>
          <div className="ml-3 w-full whitespace-nowrap lg:ml-5 lg:w-auto">
            <a href={seminar.zoom_url} target="_blank" rel="noreferrer">
              <PrimaryButton>E-カンファに事前登録</PrimaryButton>
            </a>
          </div>
        </div>
        <p className="mt-3 text-md font-bold">概要</p>
        <p
          className={
            !isOpened
              ? 'mt-1 line-clamp-4 text-ellipsis whitespace-pre-wrap text-md lg:line-clamp-3'
              : 'mt-1 min-h-[45px] whitespace-pre-wrap text-md'
          }
        >
          {seminar.description}
        </p>
        <div className="mt-2 flex justify-center">
          <TertiaryButton
            size="medium"
            onClick={() => {
              setIsOpened((prev) => !prev);
            }}
          >
            <p className="text-medii-sm font-bold">{isOpened ? '閉じる' : 'もっと読む'}</p>
          </TertiaryButton>
        </div>
      </div>
    </div>
  );
};
