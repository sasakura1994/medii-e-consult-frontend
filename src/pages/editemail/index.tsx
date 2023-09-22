import React, { useState } from 'react';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { useProfile } from '@/hooks/useProfile';
import Link from 'next/link';

type ChangeEmailProps = {
    onChangeEmail: (newEmail: string) => void;
};

const ChangeEmail: React.FC<ChangeEmailProps> = ({ onChangeEmail }) => {
    const { email } = useProfile();

    const [newEmail, setNewEmail] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.target.value);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(newEmail.trim()!=='') {
            onChangeEmail(newEmail);
            setNewEmail('');
        }
    };

    return (
        <div className='h-[100vh] bg-bg flex'>
            <div className='bg-white border border-[#ddd] mt-9 text-left m-auto w-[662px] py-[60px] rounded'>
                <div className='px-[84px]'>
                    <h2 className='mb-3 font-bold'>現在のメールアドレス</h2>
                    <p>{email?.mail_address}</p>
                    <div>
                        <form onSubmit={onSubmit}>
                            <div className='mt-10'>
                                <h2 className='mb-3 font-bold'>新しいメールアドレス</h2>
                                <div>
                                    <input
                                        type="email"
                                        id="newEmail"
                                        value={newEmail}
                                        placeholder='新しいメールアドレスに変更'
                                        onChange={handleEmailChange}
                                        className='border border-[#999] h-12 box-border w-full rounded py-1 px-2'
                                        required
                                    />
                                </div>
                            </div>
                            <div className='mt-10 flex'>
                                <Link href="/editprofile">
                                    <SecondaryButton
                                        size='large'
                                        className='mr-[26px] flex-1'
                                    >
                                        キャンセル
                                    </SecondaryButton>
                                </Link>
                                <PrimaryButton
                                    size='large'
                                    type="submit"
                                    className='flex-1'
                                >
                                    アドレスを変更
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeEmail;
