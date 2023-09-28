import React from 'react';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { Container } from '@/components/Layouts/Container';
import { ConsultExampleDetailEntity } from '@/types/entities/ConsultExampleDetailEntity';
import { ConsultExampleMessageEntity } from '@/types/entities/ConsultExampleMessageEntity';
import { ConsultExampleDetail } from '@/features/consultExample/ConsultExampleDetail';
import PrimaryButton from '@/components/Button/PrimaryButton';
import SecondaryButton from '@/components/Button/SecondaryButton';
import Link from 'next/link';


type Props = {
  chatRoom: ChatRoomEntity;
  consultExample?: ConsultExampleDetailEntity;
  consultExampleMessages?: ConsultExampleMessageEntity[];
};

export const AlreadyAssigned: React.FC<Props> = ({
  chatRoom,
  consultExample,
  consultExampleMessages,
}: Props) => {
  return (
    <>
      <div data-testid="assign-already-assigned" className="bg-white py-8">
        <Container className="px-8">
          <img
            src="/icons/exclamation.svg"
            width="32"
            height="32"
            alt=""
            className="mx-auto"
          />
          <div className="mt-2 text-center font-bold text-primary">
            申し訳ございません。以下のコンサルは他の先生に回答いただきました。
          </div>
          <div className="mt-4 flex justify-center">
            <div className="rounded border border-[#dddddd] px-[46px] py-2 text-center">
              <div className="text-sm font-bold">{chatRoom.disease_name}</div>
              <div className="mt-[1px] text-sm">{chatRoom.short_title}</div>
              <div className="tetx-block-gray mt-[1px] text-[11px]">
                ※平均回答時間：45分
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            もしよろしければ、過去の症例相談事例に先生のご知見で
            <br className="hidden lg:inline" />
            コメントいただけますと幸甚に存じます。
          </div>
          <div className="mt-1 text-center text-[11px] font-bold">
            どうぞよろしくお願いいたします。
          </div>
        </Container>
      </div>
      {consultExample && consultExampleMessages && (
        <>
          <div className="mt-6 pb-[120px]">
            <Container>
              <ConsultExampleDetail
                consultExample={consultExample}
                consultExampleMessages={consultExampleMessages}
              />
            </Container>
          </div>
          <div
            className="fixed bottom-12 left-0 right-0 p-5 text-center lg:bottom-0"
            style={{ backgroundColor: 'rgba(239, 243, 246, 0.8)' }}
          >
            <Link href={`/example/${consultExample.example_id}`}>
              <a>
                <PrimaryButton className="text-sm m-auto">
                  この事例のページへ行く
                </PrimaryButton>
              </a>
            </Link>
            <div className="mt-4">
              <Link href="/examplelist">
                <a>
                  <SecondaryButton className="text-[11px] font-normal m-auto">
                    事例集一覧を見る
                  </SecondaryButton>
                </a>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};
