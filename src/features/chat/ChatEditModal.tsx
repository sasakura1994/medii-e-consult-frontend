import { OutlinedButton } from '@/components/Parts/Button/OutlinedButton';
import { PrimaryButton } from '@/components/Parts/Button/PrimaryButton';
import { Radio } from '@/components/Parts/Form/Radio';
import { SelectBox } from '@/components/Parts/Form/SelectBox';
import { TextField } from '@/components/Parts/Form/TextField';
import { Modal } from '@/components/Parts/Modal/Modal';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { useUpdateChatRoom } from '@/hooks/api/chat/useUpdateChatRoom';
import { ChatRoomEntity, ChatRoomGender } from '@/types/entities/chat/ChatRoomEntity';
import React, { useState } from 'react';
import { KeyedMutator } from 'swr';

type ChatEditModalProps = {
  chatRoomData: FetchChatRoomResponseData;
  setIsOpenChatEditModal: (isOpen: boolean) => void;
  setIsOpenDeleteModal: (isOpen: boolean) => void;
  accountID: string;
  mutateChatRoom?: KeyedMutator<FetchChatRoomResponseData>;
  mutateChatRoomList?: KeyedMutator<ChatRoomEntity[]>;
};

export const ChatEditModal = (props: ChatEditModalProps) => {
  const { chatRoomData, setIsOpenChatEditModal, setIsOpenDeleteModal, accountID, mutateChatRoom, mutateChatRoomList } =
    props;
  const { updateChatRoom, errorMessage } = useUpdateChatRoom();
  const [selectedGender, setSelectedGender] = useState<ChatRoomGender>(chatRoomData.chat_room.gender);
  const [selectedAge, setSelectedAge] = useState(chatRoomData.chat_room.age);
  const [summary, setSummary] = useState(chatRoomData.chat_room.disease_name);
  const isOwner = chatRoomData.chat_room.owner_account_id === accountID;
  return (
    <Modal className="w-[644px]" isCenter setShowModal={setIsOpenChatEditModal}>
      <div className="mx-[82px] my-[15px]">
        <p className="my-8 text-center text-2xl font-bold">E-コンサル ルーム編集</p>
        <div className="mb-4 text-base font-bold">患者情報</div>
        <div className="flex">
          <label className="mr-4">
            <Radio
              name="gender"
              value="man"
              checked={selectedGender === 'man'}
              onChange={() => setSelectedGender('man')}
            />
            男性
          </label>
          <label>
            <Radio
              name="gender"
              value="woman"
              checked={selectedGender === 'woman'}
              onChange={() => setSelectedGender('woman')}
            />
            女性
          </label>
        </div>
        <div className="mt-6 w-[308px] ">
          <SelectBox
            name="age"
            value={String(selectedAge)}
            onChange={(e) => setSelectedAge(Number(e.target.value))}
            className="rounded border p-2"
          >
            <option value="0">0歳</option>
            <option value="1">1歳</option>
            <option value="2">2歳</option>
            <option value="3">3歳</option>
            <option value="4">4歳</option>
            <option value="5">5歳</option>
            <option value="6">6歳</option>
            <option value="7">7歳</option>
            <option value="8">8歳</option>
            <option value="9">9歳</option>
            <option value="10">10代</option>
            <option value="20">20代</option>
            <option value="30">30代</option>
            <option value="40">40代</option>
            <option value="50">50代</option>
            <option value="60">60代</option>
            <option value="70">70代</option>
            <option value="80">80代</option>
            <option value="90">90代以上</option>
          </SelectBox>
        </div>
        <div>
          <div className="mb-3 mt-4 text-base font-bold">要約</div>
          <TextField
            name="summary"
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value);
            }}
          />
        </div>
        {isOwner ? (
          <div className="mb-10 mt-8 flex justify-center space-x-4">
            <OutlinedButton className="w-[223px]" onClick={() => setIsOpenChatEditModal(false)}>
              キャンセル
            </OutlinedButton>
            <PrimaryButton
              className="w-[223px]"
              onClick={async () => {
                await updateChatRoom({
                  chat_room_id: chatRoomData.chat_room.chat_room_id,
                  age: selectedAge,
                  disease_name: summary,
                  gender: selectedGender,
                });
                await mutateChatRoom?.();
                await mutateChatRoomList?.();
                setIsOpenChatEditModal(false);
              }}
            >
              ルームを更新
            </PrimaryButton>
          </div>
        ) : (
          <div className="mb-10 mt-8 flex justify-center space-x-4">
            <OutlinedButton className="w-[223px]" onClick={() => setIsOpenChatEditModal(false)}>
              閉じる
            </OutlinedButton>
          </div>
        )}
        {isOwner && chatRoomData.chat_room.status === 'CREATED' && (
          <p
            className="mb-10 mt-8 cursor-pointer text-center text-[#999999] underline"
            onClick={() => {
              setIsOpenChatEditModal(false);
              setIsOpenDeleteModal(true);
            }}
          >
            ルームを削除する
          </p>
        )}
        {errorMessage && <p className="text-center">{errorMessage}</p>}
      </div>
    </Modal>
  );
};
