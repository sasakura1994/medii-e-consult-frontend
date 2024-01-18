import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { ConsultDetail } from '../ConsultDetail';
import { ChatMemberEntity } from '@/types/entities/chat/ChatMemberEntity';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { useConsultDetail } from '../useConsultDetail';

jest.mock('../useConsultDetail');

describe('ConsultDetail', () => {
  describe('chatRoomDisplayName', () => {
    describe('自分が専門医', () => {
      (useConsultDetail as jest.Mock).mockReturnValue({
        accountId: 'specialist',
        chatListDataWithDisplayName: [],
        getMedicalSpecialityName: jest.fn().mockReturnValue('内科'),
        getExperienceYear: jest.fn().mockReturnValue('10年'),
      });

      test('相手質問医師の表示名を表示', () => {
        render(
          <ConsultDetail
            chatRoomData={
              {
                chat_room: {
                  owner_account_id: 'owner',
                } as ChatRoomEntity,
                members: [
                  {
                    account_id: 'owner',
                    speciality_1: 'NAIKA',
                    qualified_year: 5,
                  } as ChatMemberEntity,
                ],
              } as FetchChatRoomResponseData
            }
            setSelectedTab={jest.fn()}
            fetchNewChatList={jest.fn()}
            resetChatListFromUid={jest.fn()}
          />
        );
        expect(screen.getByTestId('chat-room-display-name-speciality-and-year')).toBeInTheDocument();
      });

      test('相手質問医のプロフィール未記入ユーザーの場合科や年を表示しない', async () => {
        render(
          <ConsultDetail
            chatRoomData={
              {
                chat_room: {
                  owner_account_id: 'owner',
                } as ChatRoomEntity,
                members: [
                  {
                    account_id: 'owner',
                    speciality_1: '',
                  } as ChatMemberEntity,
                ],
              } as FetchChatRoomResponseData
            }
            setSelectedTab={jest.fn()}
            fetchNewChatList={jest.fn()}
            resetChatListFromUid={jest.fn()}
          />
        );
        await waitFor(() => {
          expect(screen.queryByTestId('chat-room-display-name-speciality-and-year')).not.toBeInTheDocument();
        });
      });
    });
  });
});
