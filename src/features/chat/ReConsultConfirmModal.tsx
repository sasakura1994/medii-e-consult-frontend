import { OutlinedButton } from '@/components/Parts/Button/OutlinedButton';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { Modal } from '@/components/Parts/Modal/Modal';
import Link from 'next/link';
import React from 'react';

type ReConsultConfirmModalProps = {
  chatRoomID: string;
  setIsOpenReConsultConfirmModal: (isOpen: boolean) => void;
};

export const ReConsultConfirmModal = (props: ReConsultConfirmModalProps) => {
  const { chatRoomID, setIsOpenReConsultConfirmModal } = props;
  return (
    <Modal className="w-[644px]" isCenter setShowModal={setIsOpenReConsultConfirmModal}>
      <div className="mx-[82px] my-[15px]">
        <p className="my-9 text-2xl font-bold">他の医師に同様のコンサルを作成します</p>

        <ul className="mb-12">
          <li className="list-disc">他の医師の意見を参考にしたい際にご利用ください。</li>
          <li className="list-disc">
            コンサル内で添付した画像を引用しているため、ルーム作成画面で適宜編集してください。
          </li>
          <li className="list-disc">すでに回答をもらった医師には送信されません。</li>
        </ul>
        <div className="mb-10 flex justify-center space-x-4">
          <OutlinedButton onClick={() => setIsOpenReConsultConfirmModal(false)}>キャンセル</OutlinedButton>
          <Link href={{ pathname: 'newchatroom', query: `reconsult=${chatRoomID}` }}>
            <PrimaryButton>コンサルに進む</PrimaryButton>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
