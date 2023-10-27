import React from 'react';
import type { NextPageWithLayout } from '@/pages/_app';
import { Assign } from '@/features/chat/assign/Assign';
import { useAssign } from '@/features/chat/assign/useAssign';
import { AssignConfirmationModal } from '@/features/chat/assign/AssignConfirmationModal';
import { AlreadyAssigned } from '@/features/chat/assign/AlreadyAssigned';
import { Container } from '@/components/Layouts/Container';
import { LegacyLayout } from '@/components/Layouts/LegacyLayout';
import { Card } from '@/components/Parts/Card/Card';
import TertiaryButton from '@/components/Button/TertiaryButton';
import Link from 'next/link';
import { SpinnerBorder } from '@/components/Parts/Spinner/SpinnerBorder';

const AssignPage: NextPageWithLayout = () => {
  const useAssignData = useAssign();
  const {
    assign,
    chatRoom,
    consultExample,
    consultExampleMessages,
    errorMessage,
    images,
    isConfirming,
    isEnableToAssign,
    isSending,
    setIsConfirming,
  } = useAssignData;

  if (isEnableToAssign === undefined) {
    return (
      <Container className="pb-10 pt-4" dataTestId="loading">
        <Card className="flex justify-center px-4 py-8 lg:px-20 lg:py-8" spNoBorder>
          <SpinnerBorder />
        </Card>
      </Container>
    );
  }

  if (isEnableToAssign === false) {
    return (
      <Container className="pb-10 pt-4" dataTestId="cannot-assign">
        <Card className="px-4 py-8 lg:px-20 lg:py-8" spNoBorder>
          <div className="flex flex-col gap-4">
            <p>
              申し訳ありません。
              <br />
              現在のアカウントでは、本コンサルに回答することができません。
              <br />
              回答依頼をお送りしておりますメールアドレスを確認いただき、正しいメールアドレスにてログインいただきますようお願いたします。
            </p>
            <p>
              別のメールアドレスでアカウントが複数できてしまっている、ログインに関して問題がある等の場合は、お問い合わせよりご連絡いただけると幸いです。
            </p>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <Link href={`/login?redirect=${encodeURIComponent(`/assign/${chatRoom?.chat_room_id ?? ''}`)}`}>
              <TertiaryButton>ログイン</TertiaryButton>
            </Link>
            <a
              href="https://tayori.com/form/62897c986d36f5b573fec1a04508f24b70b11fe6/"
              target="_blank"
              rel="noreferrer"
            >
              <TertiaryButton>お問い合わせ</TertiaryButton>
            </a>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <>
      {chatRoom &&
        (chatRoom.status === 'CREATED' ? (
          <Container className="pb-10 pt-4">
            <Assign chatRoom={chatRoom} images={images || []} onConfirm={() => setIsConfirming(true)} />
          </Container>
        ) : (
          <AlreadyAssigned
            chatRoom={chatRoom}
            consultExample={consultExample}
            consultExampleMessages={consultExampleMessages}
          />
        ))}
      {isConfirming && (
        <AssignConfirmationModal
          errorMessage={errorMessage}
          isSending={isSending}
          onSubmit={assign}
          setShowModal={setIsConfirming}
        />
      )}
    </>
  );
};

AssignPage.getLayout = (page: React.ReactElement) => {
  return <LegacyLayout>{page}</LegacyLayout>;
};

export default AssignPage;
