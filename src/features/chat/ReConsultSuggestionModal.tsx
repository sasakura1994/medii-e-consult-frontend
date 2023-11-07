import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { Modal } from '@/components/Parts/Modal/Modal';
import Link from 'next/link';
import React from 'react';

type ReConsultConfirmModalProps = {
  chatRoomID: string;
  setIsOpenReConsultSuggestionModal: (isOpen: boolean) => void;
};

export const ReConsultSuggestionModal = (props: ReConsultConfirmModalProps) => {
  const { chatRoomID, setIsOpenReConsultSuggestionModal } = props;
  return (
    <Modal
      className="w-full overflow-y-auto px-3 lg:w-[644px]"
      isCenter
      setShowModal={setIsOpenReConsultSuggestionModal}
    >
      <div className="mx-2 lg:mx-[82px] lg:my-[15px]">
        <p className="my-9">
          Mediiでは、異なる視点からの回答やより深い理解を得ていただくために「再コンサル」をおすすめしています。
          同じ内容で他の専門医にも相談してみてはいかがでしょうか？
        </p>

        <ul className="mb-12 px-5">
          <li className="list-disc">
            コンサル内で添付した画像を引用しているため、ルーム作成画面で適宜編集してください。
          </li>
          <li className="list-disc">すでに回答をもらった医師には送信されません。</li>
        </ul>
        <div className="mb-10 flex justify-center space-x-2 lg:space-x-9">
          <SecondaryButton className="w-[150px] lg:w-[223px]" onClick={() => setIsOpenReConsultSuggestionModal(false)}>
            閉じる
          </SecondaryButton>
          <Link className="w-[150px] lg:w-[223px]" href={{ pathname: 'newchatroom', query: `reconsult=${chatRoomID}` }}>
            <PrimaryButton className="w-full">再コンサルする</PrimaryButton>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
