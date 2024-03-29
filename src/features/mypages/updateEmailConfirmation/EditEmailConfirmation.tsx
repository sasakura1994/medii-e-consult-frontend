import React from 'react';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { TextField } from '@/components/Parts/Form/TextField';
import { UseEditEmailConfirmationType } from './useUpdateEmailConfirmation';
import Completed from './Completed';

const EditEmailConfirmation = ({
  firstPassword,
  setFirstPassword,
  secondPassword,
  setSecondPassword,
  errorMessage,
  submit,
  emailConfirmStatus,
}: Omit<UseEditEmailConfirmationType, 'isTokenExist' | 'isSending'>) => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <div>
      {emailConfirmStatus ? (
        <div>
          <h2 className="mt-2 text-center text-[24px] font-bold">パスワード変更</h2>
          <form onSubmit={onSubmit}>
            <div className="mt-6 w-[308px]">
              <h2 className="font-bold">パスワード</h2>
              <TextField
                type="password"
                name="first_password"
                ariaLabel="first_password"
                value={firstPassword}
                onChange={(e) => setFirstPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-6 w-[308px]">
              <h2 className="font-bold">パスワード確認</h2>
              <TextField
                type="password"
                name="second_password"
                ariaLabel="second_password"
                value={secondPassword}
                onChange={(e) => setSecondPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && (
              <div className="mt-2 w-[300px] overflow-auto text-center font-bold text-red-400">{errorMessage}</div>
            )}
            <div className="mt-12 flex">
              <PrimaryButton size="large" type="submit" className="mx-7 flex-1">
                送信
              </PrimaryButton>
            </div>
          </form>
        </div>
      ) : (
        <Completed />
      )}
    </div>
  );
};

export default EditEmailConfirmation;
