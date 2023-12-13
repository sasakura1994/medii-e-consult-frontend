import { renderHook } from '@testing-library/react';
import { useConsultDetail } from '../useConsultDetail';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { ChatData } from '@/hooks/api/chat/useFetchChatList';

describe('useConsultDetails', () => {
  describe('chatListDataWithDisplayName', () => {
    test('送信者がスタッフIDの時', async () => {
      const { result } = renderHook(() =>
        useConsultDetail({
          chatListData: [
            {
              account_id: 'ST0001',
            } as ChatData,
          ],
          chatRoomData: {
            chat_room: {
              status: 'ACTIVE',
            },
            members: [],
          } as unknown as FetchChatRoomResponseData,
          fetchNewChatList: jest.fn(),
        })
      );

      expect(result.current.chatListDataWithDisplayName?.[0].displayName).toBe('Mediiからのメッセージ');
    });
  });
});
