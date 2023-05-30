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
          href="/Chat"
          badgeText={
            unreadCounts && unreadCounts.unread_consult.length > 0
              ? unreadCounts.unread_consult.length.toString()
              : undefined
          }
        >
          コンサル一覧
        </HeaderMenuListItem>
        <HeaderMenuListItem
          href="/Group"
          badgeText={
            unreadCounts && unreadCounts.unread_conference.length > 0
              ? unreadCounts.unread_conference.length.toString()
              : undefined
          }
        >
          所属グループ
        </HeaderMenuListItem>
        <HeaderMenuListItem href={process.env.CASE_BANK_URL ?? '/'}>
          症例バンク
        </HeaderMenuListItem>
        <HeaderMenuListItem href="/ExampleList">
          コンサル事例集
        </HeaderMenuListItem>
      </HeaderMenuList>
    </HeaderMenuContainer>
  );
};
