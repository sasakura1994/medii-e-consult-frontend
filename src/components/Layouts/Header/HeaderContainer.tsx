import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const HeaderContainer: React.FC<Props> = ({ children }: Props) => {
  return (
    <header className="bg-white">
      <div
        className="
          relative
          flex
          h-[63px]
          items-center
          justify-between
          border-b
          border-solid
          border-b-[#d5d5d5]
          py-[15px]
          pl-[5%]
          pr-4
          lg:pr-[30px]"
      >
        {children}
      </div>
    </header>
  );
};
