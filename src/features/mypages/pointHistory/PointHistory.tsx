import React from 'react';
import Link from 'next/link';
import { dateFormat } from '@/libs/date';
import { usePointHistory } from './usePointHistory';

export const PointHistory: React.FC = () => {
  const {
    fetchCurrentPointLoading,
    fetchPointHistoryLoading,
    currentPoint,
    pointHistories,
    getActionNameFromRefId,
    getChatRoomLink,
  } = usePointHistory();

  if (fetchCurrentPointLoading && !currentPoint) {
    return null;
  }

  if (fetchPointHistoryLoading && !pointHistories) {
    return null;
  }

  return (
    <div className="mt-10 rounded border-[1px] border-solid border-[#d5d5d5] bg-white px-4 pt-4">
      <div className="mb-3">
        <h2>Medii ポイント残高</h2>
        <p className="text-[28px]">
          {currentPoint ? new Intl.NumberFormat('ja-JP').format(currentPoint) : 0}
          <span className="ml-2 text-base">ポイント</span>
        </p>
      </div>

      <div>
        <h2 className="mb-3 border-b border-solid border-b-heading-line pb-1">Medii ポイント履歴</h2>

        <table className="border-separate">
          <thead className="text-left text-[#999999]">
            <tr>
              <th className="pr-4">アクション</th>
              <th className="pr-4">日時</th>
              <th className="pr-4">ポイント差分</th>
              <th className="pr-4">備考</th>
            </tr>
          </thead>
          <tbody>
            {pointHistories &&
              pointHistories.map((pointHistory) => (
                <tr className="pb-3" key={pointHistory.uid}>
                  <td className="pr-5 text-md">{getActionNameFromRefId(pointHistory.ref_id)}</td>
                  <td className="pr-5 text-md">{dateFormat(pointHistory.created_date, 'YYYY/M/D HH:mm')}</td>
                  <td className="pr-5 text-right text-md">
                    {pointHistory.delta ? new Intl.NumberFormat('ja-JP').format(pointHistory.delta) : 0}
                  </td>
                  <td className="pr-5 text-md">
                    {pointHistory.ref_id.startsWith('con') && (
                      <Link href={getChatRoomLink(pointHistory.ref_id)} className="text-[#0000ee] underline">
                        該当E-コンサル
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
