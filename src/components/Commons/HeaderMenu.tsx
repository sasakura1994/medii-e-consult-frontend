import React from 'react';
import { HeaderMenuContainer } from '../Layouts/HeaderMenuContainer';
import { HeaderMenuList } from '../Layouts/HeaderMenuList';
import { HeaderMenuListItem } from '../Layouts/HeaderMenuListItem';

export const HeaderMenu: React.FC = () => {
  return (
    <HeaderMenuContainer>
      {/* PC Menu */}
      <HeaderMenuList>
        <HeaderMenuListItem href="/">コンサル一覧</HeaderMenuListItem>
        <HeaderMenuListItem href="/" badgeText="NEW">
          所属グループ
        </HeaderMenuListItem>
        <HeaderMenuListItem href="/">症例バンク</HeaderMenuListItem>
        <HeaderMenuListItem href="/">コンサル事例集</HeaderMenuListItem>
      </HeaderMenuList>
    </HeaderMenuContainer>
  );
};
