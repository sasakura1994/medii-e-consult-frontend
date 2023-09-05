import React, { useMemo } from 'react';
import TertiaryButton from '@/components/Button/TertiaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { TopTab } from './TopTab';
import { StyledHiddenScrollBar } from './styled';
import { UserConsultQuestionContent } from './UserConsultQuestionContent';
import { UserConsultNoContents } from './UserConsultNoContents';
import Link from 'next/link';
import { UserConsultAnswerContent } from './UserConsultAnswerContent';
import { useUserConsult } from './useUserConsult';

type UserConsultProps = {
  setShowTutorialExplanationModal: (isShow: boolean) => void;
};

export const UserConsult = (props: UserConsultProps) => {
  const { setShowTutorialExplanationModal } = props;
  const {
    activeTab,
    setActiveTab,
    isOpenAllChatRoom,
    setIsOpenAllChatRoom,
    mineOwnUnreadCount,
    mineRespondUnreadCount,
    medicalSpecialities,
    chatRoomMineOwnData,
    chatRoomMineRespondData,
  } = useUserConsult();

  const tmpTopBanner = useMemo(() => {
    // TODO: tmpTopBannerは2023/09/7から2023/09/14までの間だけ一時的に表示する
    const today = new Date();
    const start = new Date('2023/09/05');
    const end = new Date('2023/09/15');
    if (today < start || today > end) {
      return null;
    }
    return (
      <>
        {/* PC */}
        <Link
          href={{
            pathname: '/newchatroom',
            query: {
              target_group_id: 'GR019adaef-7526-4155-8498-a663fefc5e04',
              from: 'top_group_banner_GR019adaef-7526-4155-8498-a663fefc5e04',
            },
          }}
        >
          <img
            src="/images/top/top_group_banner_GR019adaef-7526-4155-8498-a663fefc5e04.png"
            alt="banner"
            className="mt-2 hidden cursor-pointer sm:block"
          />
        </Link>
        {/* SP */}
        <Link
          href={{
            pathname: '/newchatroom',
            query: {
              target_group_id: 'GR019adaef-7526-4155-8498-a663fefc5e04',
              from: 'top_group_banner_GR019adaef-7526-4155-8498-a663fefc5e04',
            },
          }}
        >
          <img
            src="/images/top/top_group_banner_GR019adaef-7526-4155-8498-a663fefc5e04_sp.png"
            alt="banner"
            className="mt-2 block cursor-pointer sm:hidden"
          />
        </Link>
      </>
    );
  }, []);

  return (
    <>
      <div className="mt-5 flex">
        <p className="flex-grow text-xxl font-bold text-text-primary">あなたに関わるE-コンサル</p>
        <div className="hidden whitespace-nowrap lg:block">
          <Link href="/newchatroom">
            <a>
              <PrimaryButton size="large">E-コンサルで質問する</PrimaryButton>
            </a>
          </Link>
        </div>
        <div
          className="ml-2 hidden whitespace-nowrap lg:block"
          onClick={() => {
            setShowTutorialExplanationModal(true);
          }}
        >
          <TertiaryButton size="large">E-コンサルとは？</TertiaryButton>
        </div>
      </div>
      {tmpTopBanner}
      <StyledHiddenScrollBar className="mt-5 flex items-end overflow-y-hidden overflow-x-scroll">
        <TopTab
          text="自分が質問"
          isExistUnread={mineOwnUnreadCount > 0}
          isActive={activeTab === 'question'}
          onClick={() => {
            setActiveTab('question');
          }}
        />
        <TopTab
          text="自分が回答"
          isExistUnread={mineRespondUnreadCount > 0}
          isActive={activeTab === 'answer'}
          onClick={() => {
            setActiveTab('answer');
          }}
          isLast
        />
        <div className="w-auto border-b" />
      </StyledHiddenScrollBar>
      {activeTab === 'question' && (
        <>
          {!chatRoomMineOwnData?.rooms.length && activeTab === 'question' && (
            <UserConsultNoContents setShowTutorialExplanationModal={setShowTutorialExplanationModal} />
          )}
          {chatRoomMineOwnData &&
            (isOpenAllChatRoom
              ? chatRoomMineOwnData.rooms.map((chatRoomMineOwn) => {
                  return (
                    <UserConsultQuestionContent key={chatRoomMineOwn.chat_room_id} chatRoomMineOwn={chatRoomMineOwn} />
                  );
                })
              : chatRoomMineOwnData?.rooms.slice(0, 5).map((chatRoomMineOwn) => {
                  return (
                    <UserConsultQuestionContent key={chatRoomMineOwn.chat_room_id} chatRoomMineOwn={chatRoomMineOwn} />
                  );
                }))}
          {chatRoomMineOwnData && chatRoomMineOwnData.rooms.length > 0 && (
            <>
              {isOpenAllChatRoom ? (
                <TertiaryButton
                  className="mx-auto mt-7 w-full lg:w-auto"
                  onClick={() => setIsOpenAllChatRoom((prev) => !prev)}
                >
                  閉じる
                </TertiaryButton>
              ) : (
                <TertiaryButton
                  size="large"
                  className="mx-auto mt-7 w-full lg:w-auto"
                  onClick={() => setIsOpenAllChatRoom((prev) => !prev)}
                >
                  すべてのE-コンサル
                </TertiaryButton>
              )}
            </>
          )}
        </>
      )}

      {activeTab === 'answer' && (
        <>
          {!chatRoomMineRespondData?.rooms.length && (
            <UserConsultNoContents setShowTutorialExplanationModal={setShowTutorialExplanationModal} />
          )}
          {chatRoomMineRespondData &&
            medicalSpecialities &&
            activeTab === 'answer' &&
            (isOpenAllChatRoom
              ? chatRoomMineRespondData.rooms.map((chatRoomMineRespond) => {
                  return (
                    <UserConsultAnswerContent
                      key={chatRoomMineRespond.chat_room_id}
                      chatRoomMineRespond={chatRoomMineRespond}
                      medicalSpecialities={medicalSpecialities}
                    />
                  );
                })
              : chatRoomMineRespondData?.rooms.slice(0, 5).map((chatRoomMineRespond) => {
                  return (
                    <UserConsultAnswerContent
                      key={chatRoomMineRespond.chat_room_id}
                      chatRoomMineRespond={chatRoomMineRespond}
                      medicalSpecialities={medicalSpecialities}
                    />
                  );
                }))}
          {chatRoomMineRespondData && chatRoomMineRespondData.rooms.length > 0 && (
            <>
              {isOpenAllChatRoom ? (
                <TertiaryButton
                  className="mx-auto mt-7 w-full lg:w-auto"
                  onClick={() => setIsOpenAllChatRoom((prev) => !prev)}
                >
                  閉じる
                </TertiaryButton>
              ) : (
                <TertiaryButton
                  size="large"
                  className="mx-auto mt-7 w-full lg:w-auto"
                  onClick={() => setIsOpenAllChatRoom((prev) => !prev)}
                >
                  すべてのE-コンサル
                </TertiaryButton>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
