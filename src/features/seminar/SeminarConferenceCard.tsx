import SecondaryButton from '@/components/Button/Secondary';
import TertiaryButton from '@/components/Button/Tertiary';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import React, { useMemo, useState } from 'react';

type SeminarConferenceCardProps = {
  seminar: SeminarEntityType;
};

export const SeminarConferenceCard = (props: SeminarConferenceCardProps) => {
  const { seminar } = props;
  const [isOpened, setIsOpened] = useState(false);
  const dateTime = useMemo(() => {
    const seminarDate = new Date(seminar.seminar_date);
    const time = seminar.seminar_start_time.substring(0, 5);
    return `${seminarDate.getFullYear()}/${seminarDate.getMonth()}/${seminarDate.getDate()} ${time}`;
  }, [seminar.seminar_date, seminar.seminar_start_time]);
  return (
    <div className="mt-6 h-auto w-[456px] rounded-lg bg-white p-4 shadow-high">
      <img alt="" className="h-60 w-[440px]" src={seminar.image_url} />
      <div className="mt-2 h-auto">
        <div className="flex items-center">
          <p className="text-md">{dateTime}</p>
          <div className="ml-5">
            <SecondaryButton>
              <div className="mr-1 h-4 w-4 bg-[#D9D9D9]" />
              <p>カレンダーに登録</p>
            </SecondaryButton>
          </div>
        </div>
        <p className="mt-3 text-md font-bold">セミナー概要</p>
        <p
          className={
            !isOpened
              ? 'mt-1 h-[45px] text-ellipsis text-md line-clamp-2'
              : 'mt-1 min-h-[45px] text-md'
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
            <p className="text-medii-sm font-bold">
              {isOpened ? '閉じる' : 'もっと読む'}
            </p>
          </TertiaryButton>
        </div>
      </div>
    </div>
  );
};
