import React from 'react';
import { HeaderContainer } from './HeaderContainer';
import { HeaderLogo } from './HeaderLogo';

export const HeaderLogoOnly: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderLogo />
    </HeaderContainer>
  );
};
