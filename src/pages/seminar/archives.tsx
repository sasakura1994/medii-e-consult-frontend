import React from 'react';
import type { NextPage } from 'next';
import { useSeminar } from '@/features/seminar/useSeminar';
import { SeminarCard } from '@/features/seminar/seminarCard';
import { SeminarArchiveHeader } from '@/features/seminar/seminarArchiveHeader';
import { usePagenation } from '@/hooks/usePagenation';

const Archives: NextPage = () => {
  const { seminars, ticketCount } = useSeminar();
  const numberPerPage = 8;
  const pageCount =
    seminars !== undefined
      ? Math.floor(seminars.length / numberPerPage) + 1
      : 0;
  const { current, move } = usePagenation(pageCount);
  const startNumber = (current - 1) * numberPerPage;
  const endNumber = current * numberPerPage - 1;
  const total = seminars !== undefined ? seminars.length : 0;
  return (
    <div className="mb-12 bg-[url('/images/seminar/SP_back.png')] bg-cover bg-no-repeat pt-10 lg:bg-[url('/images/seminar/PC_back.png')]">
      <div className="mx-auto flex w-full flex-col items-center rounded-lg px-6 pb-20 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] lg:max-w-[960px] lg:bg-white lg:px-20 lg:pt-14">
        <SeminarArchiveHeader ticketCount={ticketCount} />
        <p className="w-full pb-4">
          <span className="font-bold">
            {startNumber + 1} ~ {total > endNumber + 1 ? endNumber + 1 : total}
          </span>
          件を表示 / 全<span className="font-bold">{total}</span>件
        </p>
        <div>
          <div className="grid grid-cols-[1fr] gap-4 lg:grid-cols-[1fr_1fr]">
            {seminars?.slice(startNumber, endNumber + 1).map((seminar) => (
              <SeminarCard seminar={seminar} key={seminar.seminar_id} />
            ))}
          </div>
        </div>
        <div className="my-4 flex w-full items-center justify-center lg:justify-between">
          <div className="hidden w-48 lg:block">
            <a
              href="/seminar/archives"
              className="my-10  inline-flex items-center rounded-full border border-primary px-10 py-3 text-center text-sm text-primary "
            >
              <img src="/icons/arrow_left.svg" className="mr-2 inline h-3" />
              TOPへ戻る
            </a>
          </div>
          <div className="flex gap-4">
            {[...Array(pageCount)].map((_, i) =>
              i + 1 == current ? (
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white"
                  key={i}
                >
                  <p>{i + 1}</p>
                </div>
              ) : (
                <div
                  key={i}
                  onClick={() => {
                    move(i + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-block-gray"
                >
                  <p>{i + 1}</p>
                </div>
              )
            )}
          </div>
          <div className="hidden w-48 lg:block"></div>
        </div>
        <div className="block lg:w-48 lg:hidden">
          <a
            href="/seminar"
            className="my-2 inline-flex  items-center rounded-full border border-primary bg-white px-14 lg:px-10 py-4 lg:py-3 text-center text-sm text-primary lg:my-10"
          >
            <img src="/icons/arrow_left.svg" className="mr-2 inline h-3" />
            TOPへ戻る
          </a>
        </div>
        <p className="text-sm text-center">
          ※アーカイブ動画に表示している医師の方々の経歴などの情報は、セミナー当時のものとなっております。
        </p>
      </div>
    </div>
  );
};

export default Archives;
