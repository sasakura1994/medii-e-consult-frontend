import React from 'react';

export const usePasswordInput = () => {
  const [firstPassword, setFirstPassword] = React.useState('');
  const [secondPassword, setSecondPassword] = React.useState('');
  const isPasswordNotMatched = React.useMemo(
    () => firstPassword !== '' && secondPassword !== '' && firstPassword !== secondPassword,
    [firstPassword, secondPassword]
  );

  const isFirstPasswordValid = firstPassword !== '' && firstPassword.length >= 8;

  return {
    firstPassword,
    isFirstPasswordValid,
    isPasswordNotMatched,
    secondPassword,
    setFirstPassword,
    setSecondPassword,
  };
};
