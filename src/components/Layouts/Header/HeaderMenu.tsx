import React from 'react';
import { HeaderMenuContainer } from './HeaderMenuContainer';
import { HeaderMenuList } from './HeaderMenuList';
import { HeaderMenuListItem } from './HeaderMenuListItem';

export const HeaderMenu: React.FC = () => {
  return (
    <HeaderMenuContainer>
      {/* PC Menu */}
      <HeaderMenuList>
        <HeaderMenuListItem href="/Chat">コンサル一覧</HeaderMenuListItem>
        <HeaderMenuListItem href="/Group">所属グループ</HeaderMenuListItem>
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
