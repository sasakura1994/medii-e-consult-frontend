import React from 'react';
import Link from 'next/link';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useFetchTicketCount } from '@/hooks/api/seminar/useFetchTicketCount';
import { useFetchCurrentPoint } from '@/features/mypages/pointHistory/useFetchCurrentPoint';
import { usePopperTooltip } from 'react-popper-tooltip';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { HeaderMyPageButton } from './HeaderMyPageButton';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';

export const HeaderSubMenu = () => {
  const ticketTooltip = usePopperTooltip();
  const mediiPointTooltip = usePopperTooltip();

  const { ticketCount } = useFetchTicketCount();
  const { currentPoint } = useFetchCurrentPoint();
  const { postEventLog } = useEventLog();

  return (
    <>
      <nav className="flex items-center text-md text-text-primary">
        <div
          onClick={() => {
            postEventLog({ name: 'header-create-consult20221129', from: 'header20221129' });
          }}
        >
          <Link href="/newchatroom">
            <PrimaryButton size="large" className="h-[40px] w-[181px] whitespace-nowrap">
              匿名&無料で
              <br />
              エキスパートに質問する
            </PrimaryButton>
          </Link>
        </div>
        <div className="ml-4 flex items-center">
          <HeaderMyPageButton />
        </div>
        <div className="ml-8 hidden items-center lg:flex">
          <div>
            <div className="flex items-center" ref={ticketTooltip.setTriggerRef}>
              <div>
                <img src="icons/ticket-perferated.svg" width="24" height="24" alt="セミナーチケット" />
              </div>
              <div className="ml-1">{ticketCount?.ticket_count ?? 0}枚</div>
            </div>
          </div>
          <div className="ml-2">
            <div className="flex items-center" ref={mediiPointTooltip.setTriggerRef}>
              <div>
                <img src="icons/medii_point.svg" width="24" height="24" alt="Mediiポイント" />
              </div>
              <div className="ml-1">{currentPoint ? new Intl.NumberFormat('ja-JP').format(currentPoint) : 0}</div>
            </div>
          </div>
        </div>
      </nav>
      {ticketTooltip.visible && (
        <Tooltip tooltip={ticketTooltip} className="w-[200px] text-medii-sm" style={{ padding: '4px 8px' }}>
          過去のE-カンファを視聴するときに必要です。E-コンサルで相談すると、視聴チケットを1枚獲得できます。
        </Tooltip>
      )}
      {mediiPointTooltip.visible && (
        <Tooltip tooltip={mediiPointTooltip} className="w-[200px] text-medii-sm" style={{ padding: '4px 8px' }}>
          Mediiポイント1ポイントを1円として、Amazonポイントを交換できます。
          <br />
          他の医師のコンサルに回答したり、紹介した医師がMediiに会員登録するとポイントを獲得できます。
        </Tooltip>
      )}
    </>
  );
};
