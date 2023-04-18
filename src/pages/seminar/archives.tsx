import React from 'react';
import type { NextPage } from 'next';
import { SeminarCard } from '@/features/seminar/seminarCard';
import { SeminarArchiveHeader } from '@/features/seminar/seminarArchiveHeader';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSeminar } from '@/features/seminar/useSeminar';

const Archives: NextPage = () => {
  const router = useRouter();
  let { page } = router.query;
  const current = page === undefined ? 1 : Number(page);
  const numberPerPage = 8;
  const { seminars, ticketCount, maxPage, allItemsCount } = useSeminar(current);
  const startNumber = (current - 1) * numberPerPage;
  const endNumber = current * numberPerPage - 1;
  return (
    <div className="bg-[url('/images/seminar/SP_back.png')] bg-cover bg-no-repeat pb-12 pt-10 lg:bg-[url('/images/seminar/PC_back.png')]">
      <div className="mx-auto flex w-full flex-col items-center rounded-lg px-6 pb-20 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] lg:max-w-[960px] lg:bg-white lg:px-20 lg:pt-14">
        <SeminarArchiveHeader ticketCount={ticketCount} />
        <p className="w-full pb-4">
          <span className="font-bold">
            {startNumber + 1} ~{' '}
            {allItemsCount && allItemsCount > endNumber + 1
              ? endNumber + 1
              : allItemsCount}
          </span>
          件を表示 / 全<span className="font-bold">{allItemsCount}</span>件
        </p>
        <div>
          <div className="grid grid-cols-[1fr] gap-4 lg:grid-cols-[1fr_1fr]">
            {seminars?.map((seminar) => (
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
          <div className="flex items-center gap-3">
            {[...Array(maxPage)].map((_, i) =>
              i + 1 == current ? (
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white"
                  key={i}
                >
                  <p>{i + 1}</p>
                </div>
              ) : (
                <a className="flex h-9 w-9 items-center justify-center rounded-full font-bold text-slate-400">
                  <Link key={i} href={`/seminar/archives?page=${i + 1}`}>
                    <p>{i + 1}</p>
                  </Link>
                </a>
              )
            )}
          </div>
          <div className="hidden w-48 lg:block"></div>
        </div>
        <div className="block lg:hidden lg:w-48">
          <a
            href="/seminar"
            className="my-2 inline-flex  items-center rounded-full border border-primary bg-white px-14 py-4 text-center text-sm text-primary lg:my-10 lg:px-10 lg:py-3"
          >
            <img src="/icons/arrow_left.svg" className="mr-2 inline h-3" />
            TOPへ戻る
          </a>
        </div>
        <p className="text-center text-sm">
          ※アーカイブ動画に表示している医師の方々の経歴などの情報は、セミナー当時のものとなっております。
        </p>
      </div>
    </div>
  );
};

export default Archives;
