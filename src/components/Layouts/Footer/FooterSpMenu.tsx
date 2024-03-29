import React from 'react';
import { useFetchUnreadCounts } from '@/hooks/api/chat/useFetchUnreadCounts';
import { FooterSpMenuItem } from './FooterSpMenuItem';
import { useRouter } from 'next/router';

export const FooterSpMenu: React.FC = () => {
  const router = useRouter();
  const unreadCounts = useFetchUnreadCounts();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white px-2 pb-3 pt-2 shadow-high lg:hidden">
      <ul className="flex w-full">
        <FooterSpMenuItem
          href="/chat"
          image="/icons/footer_consult.svg"
          imageWidth={24}
          imageHeight={24}
          hasBadge={unreadCounts && unreadCounts.unread_consult.length > 0}
          isCurrent={router.pathname.match(/\/chat/) !== null}
        >
          E-コンサル
        </FooterSpMenuItem>
        <FooterSpMenuItem
          href="/group"
          image="/icons/footer_group.svg"
          imageWidth={25}
          imageHeight={24}
          hasBadge={unreadCounts && unreadCounts.unread_conference.length > 0}
          isCurrent={router.pathname.match(/\/group/) !== null}
        >
          グループ
        </FooterSpMenuItem>
        <FooterSpMenuItem
          href="/examplelist"
          image="/icons/footer_case.svg"
          imageWidth={24}
          imageHeight={24}
          isCurrent={router.pathname.match(/\/example/) !== null}
        >
          事例集
        </FooterSpMenuItem>
        <FooterSpMenuItem
          href="/seminar"
          image="/icons/seminar.svg"
          imageWidth={25}
          imageHeight={24}
          isCurrent={router.pathname.match(/\/seminar/) !== null}
        >
          E-カンファ
        </FooterSpMenuItem>
      </ul>
    </nav>
  );
};
