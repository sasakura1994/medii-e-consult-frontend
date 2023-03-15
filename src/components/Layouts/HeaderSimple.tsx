import React from 'react';
import { HeaderContainer } from './HeaderContainer';
import { HeaderLogo } from './HeaderLogo';
import { HeaderMenuContainer } from './HeaderMenuContainer';
import { HeaderMenuList } from './HeaderMenuList';
import { HeaderMenuListItem } from './HeaderMenuListItem';

export const HeaderSimple: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderLogo />

      <HeaderMenuContainer>
        {/* PC Menu */}
        <HeaderMenuList>
          <HeaderMenuListItem href="/login">ログイン</HeaderMenuListItem>
        </HeaderMenuList>
      </HeaderMenuContainer>
    </HeaderContainer>
  );
};
