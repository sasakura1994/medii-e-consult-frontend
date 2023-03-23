import React from 'react';

export const usePasswordInput = () => {
  const [firstPassword, setFirstPassword] = React.useState('');
  const [secondPassword, setSecondPassword] = React.useState('');
  const isPasswordNotMatched = React.useMemo(
    () =>
      firstPassword !== '' &&
      secondPassword !== '' &&
      firstPassword !== secondPassword,
    [firstPassword, secondPassword]
  );

  return {
    firstPassword,
    isPasswordNotMatched,
    secondPassword,
    setFirstPassword,
    setSecondPassword,
  };
};
