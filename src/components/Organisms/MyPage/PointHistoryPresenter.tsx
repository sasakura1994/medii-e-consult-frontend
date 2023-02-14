import React from 'react';
import Link from 'next/link';
import styles from './PointHistory.module.scss';
import { dateFormat } from '@/libs/date';
import type { PointHistoryEntityType } from '@/types/entities/pointHistoryEntity';

type PresenterPropsType = {
  currentPoint?: number;
  pointHistories?: PointHistoryEntityType[];
};

/**
 * 一覧のアクション名を取得
 *
 * MEMO:
 *      他で使い回すことがなさそうなのでモジュール化せずに一旦ここに定義した
 */
const getActionNameFromRefId = (refId: string): string => {
  if (refId.startsWith('con:')) {
    return 'E-コンサル';
  } else if (refId.startsWith('amz:')) {
    return 'Amazonギフト交換';
  } else if (refId.startsWith('utm:')) {
    return '登録キャンペーン';
  } else if (refId.startsWith('ser:')) {
    return 'ポイント付与';
  } else if (refId.startsWith('aff:')) {
    return '紹介ポイント';
  } else {
    return '';
  }
};

/**
 * 備考欄に表示される `該当E-コンサル` リンクを生成
 */
const getChatRoomLink = (refId: string): string => {
  const chatRoomId = refId.substring(4);
  return `/chat?chat_room_id=${chatRoomId}`;
};

export const PointHistoryPresenter: React.FC<PresenterPropsType> = (props) => {
  const { currentPoint, pointHistories } = props;

  return (
    <div className={styles.point_history}>
      <div className="mb-6">
        <h2>Medii ポイント残高</h2>
        <p className="text-[28px]">
          {currentPoint}
          <span className="text-base ml-2">ポイント</span>
        </p>
      </div>

      <div>
        <h2 className="border-b border-solid border-b-[#dcdcdc] pb-1 mb-3">
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
