import React from 'react';
import { HeaderContainer } from './HeaderContainer';
import { HeaderLogo } from './HeaderLogo';
import { HeaderMenuList } from './HeaderMenuList';
import { HeaderMenuListItem } from './HeaderMenuListItem';
import { useToken } from '@/hooks/authentication/useToken';

export const HeaderSimple = () => {
  const { token } = useToken();
  return (
    <HeaderContainer>
      <div className="flex items-center">
        <HeaderLogo href={token ? '/top' : '/login'} />
        <HeaderMenuList>
          <HeaderMenuListItem href="/login">ログイン</HeaderMenuListItem>
        </HeaderMenuList>
      </div>
    </HeaderContainer>
  );
};
