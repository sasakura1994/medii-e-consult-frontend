import React from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNotifySettings } from './useNotifySettings';
import { Radio } from '@/components/Parts/Form/Radio';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { Card } from '@/components/Parts/Card/Card';
import { usePopperTooltip } from 'react-popper-tooltip';
import { Tooltip } from '@/components/Tooltip/Tooltip';
import { useBreakpoint } from '@/hooks/useBreakPoint';

export const NotifySettings: React.FC = () => {
  const { notifySettings, isChanged, isError, changeNotifyNew, changeNotifySeminar, update } = useNotifySettings();
  const { isMobile } = useBreakpoint();
  const tooltip = usePopperTooltip({ placement: 'top', trigger: isMobile ? 'click' : 'hover' });

  return (
    <>
      <Card className="mt-[48px] px-6 py-10">
        <div>
          <h2 className="text-xl">通知設定</h2>

          <h2 className="mt-6 flex items-center gap-2 font-bold">
            <div>コンサル・グループチャットの新しい返信 </div>
            <img
              ref={tooltip.setTriggerRef}
              src="icons/question-circle.svg"
              alt="コンサルの相手 または グループチャットのメンバーからメッセージがきた時の通知の受取方法を選択できます。コンサル・グループチャットに関わる重要な通知のため、通知を停止することはできません。"
            />
          </h2>

          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <Radio
                value="mail-push"
                name="new_notify"
                checked={notifySettings.is_mail_notify && notifySettings.is_push_notify ? true : false}
                id="mail-push"
                label="メール・プッシュ通知 両方受け取る"
                onChange={changeNotifyNew}
              />
            </li>
            <li>
              <Radio
                value="mail"
                name="new_notify"
                checked={notifySettings.is_mail_notify && !notifySettings.is_push_notify ? true : false}
                id="mail"
                label="メール通知のみ受け取る"
                onChange={changeNotifyNew}
              />
            </li>
            <li>
              <Radio
                value="push"
                name="new_notify"
                checked={!notifySettings.is_mail_notify && notifySettings.is_push_notify ? true : false}
                id="push"
                label={
                  <>
                    プッシュ通知のみ受け取る
                    <br className="lg:hidden" />
                    （パソコン/アプリ版）
                  </>
                }
                onChange={changeNotifyNew}
              />
            </li>
          </ul>

          <h2 className="mt-8">Mediiからのお知らせメール</h2>

          <ul className="mt-4 flex flex-col gap-2">
            <li>
              <Radio
                value="permit"
                name="seminar_notify"
                checked={!notifySettings.not_seminar_mail_target ? true : false}
                id="permit"
                label="メール通知を受け取る"
                onChange={changeNotifySeminar}
              />
            </li>
            <li>
              <Radio
                value="deny"
                name="seminar_notify"
                checked={notifySettings.not_seminar_mail_target ? true : false}
                id="deny"
                label="メール通知を受け取らない"
                onChange={changeNotifySeminar}
              />
            </li>
          </ul>
        </div>

        <nav className="mt-6 text-center">
          <PrimaryButton type="button" onClick={update} size="large" className="mx-auto" disabled={!isChanged}>
            通知設定を更新
          </PrimaryButton>
        </nav>
      </Card>

      <ToastContainer
        hideProgressBar={true}
        autoClose={2000}
        position={toast.POSITION.TOP_CENTER}
        closeButton={false}
        toastClassName={() =>
          isError
            ? 'bg-toast-error text-white text-center py-2 shadow-md'
            : 'bg-toast-success text-white text-center py-2 shadow-md'
        }
      />
      {tooltip.visible && (
        <Tooltip tooltip={tooltip} className="w-[350px] text-sm" style={{ padding: '8px' }}>
          コンサルの相手 または
          グループチャットのメンバーからメッセージがきた時の通知の受取方法を選択できます。コンサル・グループチャットに関わる重要な通知のため、通知を停止することはできません。
        </Tooltip>
      )}
    </>
  );
};
