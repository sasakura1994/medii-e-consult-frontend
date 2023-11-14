import React from 'react';
import { HeaderMenuContainer } from './HeaderMenuContainer';
import { HeaderMenuList } from './HeaderMenuList';
import { HeaderMenuListItem } from './HeaderMenuListItem';
import { useFetchUnreadCounts } from '@/hooks/api/chat/useFetchUnreadCounts';

export const HeaderMenu: React.FC = () => {
  const unreadCounts = useFetchUnreadCounts();

  return (
    <HeaderMenuContainer>
      {/* PC Menu */}
      <HeaderMenuList>
        <HeaderMenuListItem
          href="/chat"
          badgeText={
            unreadCounts && unreadCounts.unread_consult.length > 0
              ? unreadCounts.unread_consult.length.toString()
              : undefined
          }
        >
          E-コンサル
        </HeaderMenuListItem>
        <HeaderMenuListItem
          href="/group"
          badgeText={
            unreadCounts && unreadCounts.unread_conference.length > 0
              ? unreadCounts.unread_conference.length.toString()
              : undefined
          }
        >
          グループ
        </HeaderMenuListItem>
        <HeaderMenuListItem href="/examplelist">E-コンサル事例集</HeaderMenuListItem>
        <HeaderMenuListItem href="/seminar">E-カンファ</HeaderMenuListItem>
      </HeaderMenuList>
    </HeaderMenuContainer>
  );
};
