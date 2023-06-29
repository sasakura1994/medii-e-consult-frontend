import React from 'react';
import { HeaderMenu } from '@/components/Layouts/Header/HeaderMenu';
import { HeaderSubMenu } from '@/components/Layouts/Header/HeaderSubMenu';
import { HeaderContainer } from './HeaderContainer';
import { HeaderLogo } from './HeaderLogo';

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <div className="flex items-center">
        <HeaderLogo />
        <HeaderMenu />
      </div>

      <HeaderSubMenu />
    </HeaderContainer>
  );
};
