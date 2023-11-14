import { Modal } from '@/components/Parts/Modal/Modal';
import { ModalTitleWithCloseButton } from '@/components/Parts/Modal/ModalTitleWithCloseButton';
import React, { useState } from 'react';
import { SearchGroupModalLabelAndInput } from '../chat/newChatRoom/SearchGroupModalLabelAndInput';
import { usePrefecture } from '@/hooks/prefecture/usePrefecture';
import { SelectBox } from '@/components/Parts/Form/SelectBox';
import { MedicalSpecialitySelectButton } from '@/components/MedicalSpeciality/MedicalSpecialitySelectButton';
import TextField from '@/components/TextField/TextField';
import PrimaryButton from '@/components/Button/PrimaryButton';

type Props = {
  setIsOpenModal: (isOpenModal: boolean) => void;
};

export const InviteMemberModal = (props: Props) => {
  const { setIsOpenModal } = props;
  const { prefectures } = usePrefecture();
  const [selectedPrefecture, setSelectedPrefecture] = useState('');
  const [specialityCode, setSpecialityCode] = useState('');

  return (
    <Modal setShowModal={setIsOpenModal} pcWidth="600">
      <div className="mx-6 my-10 lg:mx-20">
        <ModalTitleWithCloseButton title="E-コンサルするグループを選択" onClose={() => setIsOpenModal(false)} />
        <div className="mt-3 flex items-center gap-2">
          <div className="w-full">
            <p className="mb-1 font-bold">都道府県</p>
            {prefectures && (
              <SelectBox
                name="prefecture_code"
                id="prefecture_code"
                value={selectedPrefecture}
                onChange={(e) => setSelectedPrefecture(e.target.value)}
              >
                <option value="">指定なし</option>
                {prefectures.map((prefecture) => (
                  <option value={prefecture.code} key={prefecture.code}>
                    {prefecture.name}
                  </option>
                ))}
              </SelectBox>
            )}
          </div>
          <div className="w-full">
            <SearchGroupModalLabelAndInput
              label="専門科
"
              className="flex-1"
            >
              <MedicalSpecialitySelectButton
                specialityCode={specialityCode}
                onChange={(specialityCode) => setSpecialityCode(specialityCode)}
              />
            </SearchGroupModalLabelAndInput>
          </div>
        </div>
        <div className="my-2">
          <p className="mb-1 font-bold">氏名</p>
          <TextField name="name" id="name" className="h-12 w-full" placeholder="氏名から検索" />
        </div>
        <PrimaryButton className="mx-auto mt-6 h-12 px-12">検索</PrimaryButton>

        <p className="mt-3 text-center">招待済みメンバー数： 0名</p>
      </div>
    </Modal>
  );
};
