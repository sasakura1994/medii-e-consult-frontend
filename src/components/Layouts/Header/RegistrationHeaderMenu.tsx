import React from 'react';
import { HeaderMenuContainer } from './HeaderMenuContainer';
import { HeaderMenuList } from './HeaderMenuList';
import { HeaderMenuListItem } from './HeaderMenuListItem';

export const RegistrationHeaderMenu: React.FC = () => {
  return (
    <HeaderMenuContainer>
      {/* PC Menu */}
      <HeaderMenuList>
        <HeaderMenuListItem href="/login">ログイン</HeaderMenuListItem>
      </HeaderMenuList>
    </HeaderMenuContainer>
  );
};
