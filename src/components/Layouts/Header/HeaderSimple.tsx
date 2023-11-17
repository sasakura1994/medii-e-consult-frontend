import React from 'react';
import { HeaderContainer } from './HeaderContainer';
import { HeaderLogo } from './HeaderLogo';
import { HeaderMenuList } from './HeaderMenuList';
import { HeaderMenuListItem } from './HeaderMenuListItem';

export const HeaderSimple: React.FC = () => {
  return (
    <HeaderContainer>
      <div className="flex items-center">
        <HeaderLogo href="/login" />
        <HeaderMenuList>
          <HeaderMenuListItem href="/login">ログイン</HeaderMenuListItem>
        </HeaderMenuList>
      </div>
    </HeaderContainer>
  );
};
