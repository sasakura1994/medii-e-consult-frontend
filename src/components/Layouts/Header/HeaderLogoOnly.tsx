import React from 'react';
import { HeaderContainer } from './HeaderContainer';
import { HeaderLogo } from './HeaderLogo';

export const HeaderLogoOnly = () => {

  return (
    <HeaderContainer>
      <div className="flex z-10">
        <HeaderLogo />
      </div>
    </HeaderContainer>
  );
};
