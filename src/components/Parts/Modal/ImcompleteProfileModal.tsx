import React from 'react';
import { Modal } from './Modal';
import Link from 'next/link';
import { useImcompleteProfileModal } from './useImcompleteProfileModal';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { PrimaryButton } from '../Button/PrimaryButton';

const getMessage = (profile: ProfileEntity) => {
  if (profile.status === 'CREATED') {
    return (
      <>
        プロフィール情報が入力されておりません。
        <br />
        お手数ですがサービスをご利用頂くためにプロフィール画面のご入力をお願いいたします。
      </>
    );
  } else if (profile.status === 'PROFILE') {
    return (
      <>
        確認資料が提出されておりません。
        <br />
        お手数ですがサービスをご利用頂くためにプロフィール画面から確認資料をご提出ください。
      </>
    );
  }

  return <></>;
};

export const ImcompleteProfileModal = () => {
  const { isModalShown, profile, url } = useImcompleteProfileModal();

  if (!profile || !isModalShown) {
    return <></>;
  }

  return (
    <Modal className="py-6 lg:w-[644px]" isCenter>
      <div className="flex flex-col items-center" data-testid="imcomplete-profile-modal">
        <div className="my-5 text-sm">{getMessage(profile)}</div>
        <div className="my-6">
          <Link href={url} className="text-decoration: none; padding-left: 2rem; padding-right: 2rem">
            <PrimaryButton size="lg">プロフィール画面を開く</PrimaryButton>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
