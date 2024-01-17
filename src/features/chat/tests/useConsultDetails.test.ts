import { renderHook } from '@testing-library/react';
import { useConsultDetail } from '../useConsultDetail';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { ChatData } from '@/hooks/api/chat/useFetchChatList';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';

jest.mock('@/hooks/medicalSpeciality/useMedicalSpeciality');

const getMedicalSpecialityName = jest.fn();
getMedicalSpecialityName.mockReturnValue('ICU/集中治療科');
(useMedicalSpeciality as jest.Mock).mockReturnValue({
  getMedicalSpecialityName,
});

describe('useConsultDetails', () => {
  describe('chatListDataWithDisplayName', () => {
    describe('自分の場合', () => {
      test('名前がある場合', async () => {
        const { result } = renderHook(() =>
          useConsultDetail({
            chatListData: [
              {
                account_id: 'AC0001',
              } as ChatData,
            ],
            chatRoomData: {
              chat_room: {
                status: 'ACTIVE',
              },
              members: [],
              me: {
                account_id: 'AC0001',
                first_name: '太郎',
                last_name: '山田',
              },
            } as unknown as FetchChatRoomResponseData,
            fetchNewChatList: jest.fn(),
          })
        );

        expect(result.current.chatListDataWithDisplayName?.[0].displayName).toBe('山田 太郎先生');
      });

      test('名前がない場合', async () => {
        const { result } = renderHook(() =>
          useConsultDetail({
            chatListData: [
              {
                account_id: 'AC0001',
              } as ChatData,
            ],
            chatRoomData: {
              chat_room: {
                status: 'ACTIVE',
              },
              members: [],
              me: {
                account_id: 'AC0001',
                speciality_1: 'ICU',
                qualified_year: new Date().getFullYear() - 20,
              },
            } as unknown as FetchChatRoomResponseData,
            fetchNewChatList: jest.fn(),
          })
        );

        expect(result.current.chatListDataWithDisplayName?.[0].displayName).toBe('ICU/集中治療科 21年目');
      });

      test('名前も所属科もない場合', async () => {
        const { result } = renderHook(() =>
          useConsultDetail({
            chatListData: [
              {
                account_id: 'AC0001',
              } as ChatData,
            ],
            chatRoomData: {
              chat_room: {
                owner_account_id: 'AC0001',
                status: 'ACTIVE',
              },
              members: [],
              me: {
                account_id: 'AC0001',
                speciality_1: '',
                qualified_year: new Date().getFullYear() - 20,
              },
            } as unknown as FetchChatRoomResponseData,
            fetchNewChatList: jest.fn(),
          })
        );

        expect(result.current.chatListDataWithDisplayName?.[0].displayName).toBe('質問医');
      });
    });

    describe('自分以外の場合', () => {
      test('名前がある場合', async () => {
        const { result } = renderHook(() =>
          useConsultDetail({
            chatListData: [
              {
                account_id: 'AC0001',
              } as ChatData,
            ],
            chatRoomData: {
              chat_room: {
                status: 'ACTIVE',
              },
              members: [
                {
                  account_id: 'AC0001',
                  first_name: '太郎',
                  last_name: '山田',
                },
              ],
            } as unknown as FetchChatRoomResponseData,
            fetchNewChatList: jest.fn(),
          })
        );

        expect(result.current.chatListDataWithDisplayName?.[0].displayName).toBe('山田 太郎先生');
      });

      test('名前がない場合', async () => {
        const { result } = renderHook(() =>
          useConsultDetail({
            chatListData: [
              {
                account_id: 'AC0001',
              } as ChatData,
            ],
            chatRoomData: {
              chat_room: {
                status: 'ACTIVE',
              },
              members: [
                {
                  account_id: 'AC0001',
                  speciality_1: 'ICU',
                  qualified_year: new Date().getFullYear() - 20,
                },
              ],
            } as unknown as FetchChatRoomResponseData,
            fetchNewChatList: jest.fn(),
          })
        );

        expect(result.current.chatListDataWithDisplayName?.[0].displayName).toBe('ICU/集中治療科 21年目');
      });
    });

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

    test('CHATBOT', async () => {
      const { result } = renderHook(() =>
        useConsultDetail({
          chatListData: [
            {
              account_id: 'CHATBOT',
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

      expect(result.current.chatListDataWithDisplayName?.[0].displayName).toBe('システム通知');
    });
  });
});
