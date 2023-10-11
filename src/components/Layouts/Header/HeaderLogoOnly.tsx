import React from 'react';
import { HeaderContainer } from './HeaderContainer';
import { HeaderLogo } from './HeaderLogo';
import { HeaderLogin } from './HeaderLogin';

type PropsType = {
  isPublicPage: boolean;
};

export const HeaderLogoOnly = (props: PropsType) => {
  const { isPublicPage } = props;

  return (
    <HeaderContainer>
      <div className="flex z-10">
        <HeaderLogo />
        {isPublicPage && <HeaderLogin />}
      </div>
    </HeaderContainer>
  );
};
