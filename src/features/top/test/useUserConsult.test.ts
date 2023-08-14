import { renderHook, cleanup, act } from '@testing-library/react';
import { useUserConsult } from '../useUserConsult';
import { useFetchChatRoomMineOwn } from '@/hooks/api/chat/useFetchChatRoomMineOwn';
import { useFetchChatRoomMineRespond } from '@/hooks/api/chat/useFetchChatRoomMineRespond';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';

jest.mock('@/hooks/api/chat/useFetchChatRoomMineOwn');
jest.mock('@/hooks/api/chat/useFetchChatRoomMineRespond');
jest.mock('@/hooks/api/medicalCategory/useFetchMedicalSpecialities');

beforeEach(() => {
  (useFetchChatRoomMineOwn as jest.Mock).mockReturnValue({
    data: {
      rooms: [],
    },
  });
  (useFetchChatRoomMineRespond as jest.Mock).mockReturnValue({
    data: {
      rooms: [],
    },
  });
  (useFetchMedicalSpecialities as jest.Mock).mockReturnValue({
    medicalSpecialities: [],
  });
});

afterEach(() => {
  cleanup();
});

describe('useUserConsult hook', () => {
  test('初期値チェック', () => {
    const { result } = renderHook(() => useUserConsult());
    expect(result.current.activeTab).toBe('question');
    expect(result.current.isOpenAllChatRoom).toBe(false);
    expect(result.current.mineOwnUnreadCount).toBe(0);
    expect(result.current.mineRespondUnreadCount).toBe(0);
  });
  test('タブが切り替えられるか', () => {
    const { result } = renderHook(() => useUserConsult());
    act(() => result.current.setActiveTab('answer'));
    expect(result.current.activeTab).toBe('answer');
  });

  test('全て表示ボタンが押せるか', () => {
    const { result } = renderHook(() => useUserConsult());
    act(() => result.current.setIsOpenAllChatRoom(true));
    expect(result.current.isOpenAllChatRoom).toBe(true);
  });

  test('mineOwnUnreadCountの数が正しいか', () => {
    (useFetchChatRoomMineOwn as jest.Mock).mockReturnValue({
      data: {
        rooms: [{ unread_count: 3 }, { unread_count: 4 }, { unread_count: 2 }],
      },
    });
    const { result } = renderHook(() => useUserConsult());
    expect(result.current.mineOwnUnreadCount).toBe(9);
  });
  test('mineRespondUnreadCountの数が正しいか', () => {
    (useFetchChatRoomMineRespond as jest.Mock).mockReturnValue({
      data: {
        rooms: [{ unread_count: 3 }, { unread_count: 4 }, { unread_count: 2 }],
      },
    });
    const { result } = renderHook(() => useUserConsult());
    expect(result.current.mineRespondUnreadCount).toBe(9);
  });
});
