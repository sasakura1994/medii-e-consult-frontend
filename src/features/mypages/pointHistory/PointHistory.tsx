import Link from 'next/link';
import { dateFormat } from '@/libs/date';
import { usePointHistory } from './usePointHisotry';

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
    <div className='w-100 bg-white mt-10 mb-[49px] lg:mb-10 rounded border-[1px] border-solid border-[#d5d5d5] p-4'>
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

        <table className="border-separate">
          <thead className='text-[#999999] text-left'>
            <tr className='leading-4'>
              <th className='pr-4'>アクション</th>
              <th className='pr-4'>日時</th>
              <th className='pr-4'>ポイント差分</th>
              <th className='pr-4'>備考</th>
            </tr>
          </thead>
          <tbody>
            {pointHistories &&
              pointHistories.map((pointHistory) => (
                <tr key={pointHistory.uid}>
                  <td className='text-[15px] py-1 pr-5'>{getActionNameFromRefId(pointHistory.ref_id)}</td>
                  <td className='text-[15px] py-1 pr-5'>
                    {dateFormat(pointHistory.created_date, 'YYYY/M/D HH:mm')}
                  </td>
                  <td className="text-right text-[15px] py-1 pr-5">{pointHistory.delta}</td>
                  <td className='text-[15px] py-1 pr-5'>
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
