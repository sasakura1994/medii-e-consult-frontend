import { Tooltip } from '@/components/Tooltip/Tooltip';
import React from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import { HeaderMyPageMenuItem } from './HeaderMyPageMenuItem';
import { removeAuthToken } from '@/libs/cookie';
import { useRouter } from 'next/router';

export const HeaderMyPageButton = () => {
  const router = useRouter();
  const tooltip = usePopperTooltip({ trigger: 'click', interactive: true });

  return (
    <>
      <button className="font-bold text-secondary" ref={tooltip.setTriggerRef}>
        マイページ
      </button>
      {tooltip.visible && (
        <Tooltip
          tooltip={tooltip}
          style={{ padding: '8px 0' }}
          className="text-md"
        >
          <HeaderMyPageMenuItem href="/editprofile">
            マイページ
          </HeaderMyPageMenuItem>
          <HeaderMyPageMenuItem href="/notifysetting">
            通知設定
          </HeaderMyPageMenuItem>
          <HeaderMyPageMenuItem href="/affiliate">
            <div>知り合いの医師にMediiを紹介する</div>
            <div className="text-medii-sm font-semibold text-medii-blue-base">
              対象の医師を1人紹介でポイントプレゼント
            </div>
          </HeaderMyPageMenuItem>
          <HeaderMyPageMenuItem href="/pointhistory">
            Mediiポイントを確認・利用する
          </HeaderMyPageMenuItem>
          <hr className="my-2 border-t border-border-divider" />
          <HeaderMyPageMenuItem href="/howtouse">
            E-コンサルの使い方
          </HeaderMyPageMenuItem>
          <HeaderMyPageMenuItem
            href="https://tayori.com/faq/4cb3c7c0fd09ab493d1efcbf01dcf76729c62202/"
            target="_blank"
          >
            よくある質問
          </HeaderMyPageMenuItem>
          <HeaderMyPageMenuItem
            href="https://tayori.com/form/62897c986d36f5b573fec1a04508f24b70b11fe6/"
            target="_blank"
          >
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
