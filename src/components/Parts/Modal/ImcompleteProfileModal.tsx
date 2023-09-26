import React, { useMemo } from 'react';
import { Modal } from './Modal';
import Link from 'next/link';
import { useImcompleteProfileModal } from './useImcompleteProfileModal';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { PrimaryButton } from '../Button/PrimaryButton';

export type Props = {
  // 医師確認待ちの場合に操作を許容するかどうか
  allowWaiting?: boolean;
};

const getMessage = (profile: ProfileEntity) => {
  if (profile.is_imperfect_profile) {
    return (
      <>
        プロフィール情報が入力されておりません。
        <br />
        お手数ですがサービスをご利用頂くためにプロフィール画面のご入力をお願いいたします。
      </>
    );
  } else if (profile.status === 'PROFILE' || (profile.status === 'CREATED' && profile.need_to_send_confimation)) {
    return (
      <>
        確認資料が提出されておりません。
        <br />
        お手数ですがサービスをご利用頂くためにプロフィール画面から確認資料をご提出ください。
      </>
    );
  }

  return (
    <>
      現在、ご提出頂いた資料を確認中です。
      <br />
      恐れ入りますが確認完了までしばらくお待ち下さい。
      <br />
      確認完了次第、メールにてご連絡いたします。
    </>
  );
};

export const ImcompleteProfileModal: React.FC<Props> = (props: Props) => {
  const { isModalShown, profile, url } = useImcompleteProfileModal(props);

  if (!profile || !isModalShown) {
    return <></>;
  }

  return (
    <Modal className="py-6 lg:w-[644px]" isCenter>
      <div className="flex flex-col items-center" data-testid="imcomplete-profile-modal">
        <div className="my-5 text-sm">{getMessage(profile)}</div>
        <div className="my-6">
          <Link href={url} className="text-decoration: none; padding-left: 2rem; padding-right: 2rem">
            <a>
              <PrimaryButton size="lg">プロフィール画面を開く</PrimaryButton>
            </a>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
