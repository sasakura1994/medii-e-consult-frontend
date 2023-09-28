import React from 'react';
import SecondaryButton from '@/components/Button/SecondaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useProfile } from '@/hooks/useProfile';
import Link from 'next/link';
import { UseEditEmail } from '@/features/mypages/editEmail/useUpdateEmail';

const EditEmail = ({ submit, setEmail, email, errorMessage }: Omit<UseEditEmail, 'editEmailStatus'>) => {
  const { email: oldEmail } = useProfile();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <div className="px-[28px] xx:px-[84px]">
      <h2 className="mt-2 text-center font-bold text-[#f27474]">{errorMessage}</h2>
      <h2 className="mb-3 font-bold">現在のメールアドレス</h2>
      <p>{oldEmail?.mail_address}</p>
      <div>
        <form onSubmit={onSubmit}>
          <div className="mt-10">
            <h2 className="mb-3 font-bold">新しいメールアドレス</h2>
            <div>
              <input
                type="email"
                id="newEmail"
                value={email}
                placeholder="新しいメールアドレスに変更"
                onChange={handleEmailChange}
                className="box-border h-12 w-full rounded border border-[#999] px-2 py-1"
                required
              />
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-6 xx:flex-row">
            <Link href="/editprofile">
              <SecondaryButton size="large" className="mx-12 xx:mx-0 xx:flex-1">
                キャンセル
              </SecondaryButton>
            </Link>
            <PrimaryButton size="large" type="submit" className="mx-12 xx:mx-0 xx:flex-1">
              アドレスを変更
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmail;
