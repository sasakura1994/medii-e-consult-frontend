import { Tooltip } from '@/components/Tooltip/Tooltip';
import React from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { HeaderMyPageMenuItem } from './HeaderMyPageMenuItem';
import { removeAuthToken } from '@/libs/cookie';
import { useRouter } from 'next/router';
import { contactUrl, faqUrl } from '@/data/constants';

export const HeaderMyPageButton = () => {
  const router = useRouter();
  const tooltip = usePopperTooltip({ trigger: 'click', interactive: true });

  return (
    <>
      <button className="font-bold text-secondary" ref={tooltip.setTriggerRef}>
        <span className="hidden lg:inline">マイページ</span>
        <img className="lg:hidden" src="icons/list.svg" width="32" height="32" alt="マイページ" />
      </button>
      {tooltip.visible && (
        <Tooltip tooltip={tooltip} style={{ padding: '8px 0' }} className="text-md">
          <HeaderMyPageMenuItem href="/editprofile">プロフィール</HeaderMyPageMenuItem>
          <HeaderMyPageMenuItem href="/notifysettings">通知設定</HeaderMyPageMenuItem>
          <HeaderMyPageMenuItem href="/affiliate">
            <div>知り合いの医師にE-コンサルを紹介</div>
            <div className="mt-1 flex items-center gap-1 rounded-sm border border-medii-sky-base bg-[#E8FAFC] p-2">
              <div>
                <img src="icons/point_invitation.svg" width="21" height="21" alt="" />
              </div>
              <div>
                お一人紹介で
                <br />
                <span className="font-bold text-medii-sky-base">最大4,500円相当</span>のポイント進呈
              </div>
            </div>
          </HeaderMyPageMenuItem>
          <HeaderMyPageMenuItem href="/pointhistory">Mediiポイントを確認・利用する</HeaderMyPageMenuItem>
          <hr className="my-2 border-t border-border-divider" />
          <HeaderMyPageMenuItem href="/howtouse">E-コンサルの使い方</HeaderMyPageMenuItem>
          <HeaderMyPageMenuItem href={faqUrl} target="_blank">
            よくある質問
          </HeaderMyPageMenuItem>
          <HeaderMyPageMenuItem href={contactUrl} target="_blank">
            お問い合わせ
          </HeaderMyPageMenuItem>
          <HeaderMyPageMenuItem
            href="#"
            onClick={(e) => {
              e.preventDefault();
              removeAuthToken();
              router.push('/login');
            }}
          >
            ログアウト
          </HeaderMyPageMenuItem>
        </Tooltip>
      )}
    </>
  );
};
