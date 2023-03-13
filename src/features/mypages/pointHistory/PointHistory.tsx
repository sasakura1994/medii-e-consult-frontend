import React from 'react';
import Link from 'next/link';
import styles from './PointHistory.module.scss';
import { dateFormat } from '@/libs/date';
import { useToken } from '@/hooks/useToken';
import { usePointHistory } from './usePointHisotry';

export const PointHistory: React.FC = () => {
  const token = useToken();
  const {
    fetchCurrentPointLoading,
    fetchPointHistoryLoading,
    currentPoint,
    pointHistories,
    getActionNameFromRefId,
    getChatRoomLink,
  } = usePointHistory(token);

  if (fetchCurrentPointLoading && !currentPoint) {
    return null;
  }

  if (fetchPointHistoryLoading && !pointHistories) {
    return null;
  }

  return (
    <div className={styles.point_history}>
      <div className="mb-6">
        <h2>Medii ポイント残高</h2>
        <p className="text-[28px]">
          {currentPoint}
          <span className="ml-2 text-base">ポイント</span>
        </p>
      </div>

      <div>
        <h2 className="mb-3 border-b border-solid border-b-heading-line pb-1">
          Medii ポイント履歴
        </h2>

        <table className={styles.history_table}>
          <thead>
            <tr>
              <th>アクション</th>
              <th>日時</th>
              <th>ポイント差分</th>
              <th>備考</th>
            </tr>
          </thead>
          <tbody>
            {pointHistories &&
              pointHistories.map((pointHistory) => (
                <tr key={pointHistory.ref_id}>
                  <td>{getActionNameFromRefId(pointHistory.ref_id)}</td>
                  <td>
                    {dateFormat(pointHistory.created_date, 'YYYY/M/D HH:mm')}
                  </td>
                  <td className="text-right">{pointHistory.delta}</td>
                  <td>
                    {pointHistory.ref_id.startsWith('con') && (
                      <Link href={getChatRoomLink(pointHistory.ref_id)}>
                        <a className="text-[#0000ee] underline">
                          該当E-コンサル
                        </a>
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
