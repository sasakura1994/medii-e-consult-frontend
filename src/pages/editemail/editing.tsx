import React from 'react';
import SecondaryButton from '@/components/Button/SecondaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { useProfile } from '@/hooks/useProfile';
import Link from 'next/link';
import { useUpdateEmail } from '@/features/mypages/editEmail/useUpdateEmail';

const Editing = () => {
  const { email: oldEmail } = useProfile();

  const updateEmail = useUpdateEmail();

  const { email, setEmail, submit } = updateEmail;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <div className="px-[84px]">
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
          <div className="mt-10 flex">
            <Link href="/editprofile">
              <SecondaryButton size="large" className="mr-[26px] flex-1">
                キャンセル
              </SecondaryButton>
            </Link>
            <PrimaryButton size="large" type="submit" className="flex-1">
              アドレスを変更
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editing;
