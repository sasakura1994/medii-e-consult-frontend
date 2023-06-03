import PrimaryButton from '@/components/Button/Primary';
import SecondaryButton from '@/components/Button/Secondary';
import TertiaryButton from '@/components/Button/Tertiary';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import React, { useMemo, useState } from 'react';

type SeminarConferenceCardProps = {
  seminar: SeminarEntityType;
  index: number;
};

export const SeminarConferenceCard = (props: SeminarConferenceCardProps) => {
  const { seminar, index } = props;
  const [isOpened, setIsOpened] = useState(false);

  const googleCalendarUrl = useMemo(() => {
    if (!seminar) return '';
    const date = seminar.seminar_date.substring(0, 11);
    const start = encodeURIComponent(
      (date + seminar.seminar_start_time).replace(/[-:]/g, '')
    );
    const end = encodeURIComponent(
      (date + seminar.seminar_end_time).replace(/[-:]/g, '')
    );
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      seminar.subject
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      seminar.description
    )}&location=${encodeURIComponent(seminar.zoom_url)}`;
  }, [seminar]);

  const dateTime = useMemo(() => {
    const seminarDate = new Date(seminar.seminar_date);
    const time = seminar.seminar_start_time.substring(0, 5);
    return `${seminarDate.getFullYear()}/${
      seminarDate.getMonth() + 1
    }/${seminarDate.getDate()} ${time}`;
  }, [seminar.seminar_date, seminar.seminar_start_time]);
  if (index === 0) {
    return (
      <div className="mt-6 flex h-auto w-[343px] flex-wrap rounded-lg bg-white p-4 shadow-high lg:w-[928px] lg:p-0">
        <img
          alt=""
          src={seminar.image_url}
          className="h-[183px] w-[327px] lg:m-4 lg:h-[237px] lg:w-[424px]"
        />
        <div className="m-4 ml-0 lg:w-[440px]">
          <a href={seminar.zoom_url} target="_blank" rel="noreferrer">
            <PrimaryButton>ZOOMセミナーへ参加</PrimaryButton>
          </a>
          <div className="mt-1 flex items-center">
            <p className="text-md">{dateTime}</p>
            <div className="ml-5">
              <a href={googleCalendarUrl} target="_blank" rel="noreferrer">
                <SecondaryButton>
                  <div className="mr-1 h-4 w-4 bg-[#D9D9D9]" />
                  <p>カレンダーに登録</p>
                </SecondaryButton>
              </a>
            </div>
          </div>
          <p className="mt-3 text-md font-bold">セミナー概要</p>
          <p
            className={
              !isOpened
                ? 'mt-1 text-ellipsis text-md line-clamp-3'
                : 'mt-1 text-md'
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
  }
  return (
    <div className="mt-6 mr-4 h-auto w-[343px] rounded-lg bg-white p-4 shadow-high lg:w-[456px]">
      <img
        alt=""
        className="h-[183px] w-[327px] lg:h-[237px] lg:w-[424px]"
        src={seminar.image_url}
      />
      <div className="mt-2 h-auto">
        <div className="flex items-center">
          <p className="text-md">{dateTime}</p>
          <div className="ml-5">
            <a href={googleCalendarUrl} target="_blank" rel="noreferrer">
              <SecondaryButton>
                <div className="mr-1 h-4 w-4 bg-[#D9D9D9]" />
                <p>カレンダーに登録</p>
              </SecondaryButton>
            </a>
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
