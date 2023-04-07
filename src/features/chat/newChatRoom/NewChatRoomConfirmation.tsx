import React from 'react';
import { useNewChatRoom } from '@/features/chat/newChatRoom/useNewChatRoom';
import { NewChatRoomConfirmationLabel } from './NewChatRoomConfirmationLabel';
import { NewChatRoomConfirmationValue } from './NewChatRoomConfirmationValue';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';

type Props = ReturnType<typeof useNewChatRoom>;

export const NewChatRoomConfirmation: React.FC<Props> = (props: Props) => {
  const { ageRange, backToInput, childAge, formData, isSending, submit } =
    props;

  return (
    <>
      <h1 className="text-center text-2xl leading-9">
        E-コンサル ルーム プレビュー
      </h1>
      <div className="mx-auto mb-10 lg:w-[80%]">
        <div className="text-strong my-8 text-center text-sm">
          &lt;注意&gt;本サービスを通して得た専門的知見に基づくアドバイスは、
          質問医である担当医師の判断・責任でご活用ください
        </div>
        <NewChatRoomConfirmationLabel>患者情報</NewChatRoomConfirmationLabel>
        <NewChatRoomConfirmationValue className="mt-4 flex gap-4">
          <div>{ageRange === 'child' ? `${childAge}歳` : `${ageRange}代`}</div>
          <div>{formData.gender === 'man' ? '男性' : '女性'}</div>
        </NewChatRoomConfirmationValue>
        <NewChatRoomConfirmationLabel className="mt-10">
          要約
        </NewChatRoomConfirmationLabel>
        <NewChatRoomConfirmationValue className="mt-4">
          {formData.disease_name}
        </NewChatRoomConfirmationValue>
        <NewChatRoomConfirmationLabel className="mt-10">
          コンサル文
        </NewChatRoomConfirmationLabel>
        <div className="mt-4 whitespace-pre-wrap break-words text-sm">
          {formData.first_message}
        </div>
        <div className="mt-8 text-center">
          {!isSending ? (
            <>
              <div>
                <button type="button" onClick={() => backToInput()}>
                  編集
                </button>
              </div>
              <div className="mt-4">
                <button type="button" onClick={() => submit()}>
                  E-コンサルを開始
                </button>
              </div>
            </>
          ) : (
            <SpinnerBorder />
          )}
        </div>
      </div>
    </>
  );
};
