import { useFetchChatList } from '@/hooks/api/chat/useFetchChatList';
import { useFetchChatRoom } from '@/hooks/api/chat/useFetchChatRoom';
import { useFetchChatRoomList } from '@/hooks/api/chat/useFetchChatRoomList';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { useToken } from '@/hooks/authentication/useToken';
import { useWebSocket } from '@/hooks/useWebSocket';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useGroup } from './useGroup';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/useWebSocket', () => ({
  useWebSocket: jest.fn(),
}));

jest.mock('@/hooks/authentication/useToken', () => ({
  useToken: jest.fn(),
}));

jest.mock('@/hooks/api/chat/useFetchChatRoomList', () => ({
  useFetchChatRoomList: jest.fn(),
}));

jest.mock('@/hooks/api/chat/useFetchChatRoom', () => ({
  useFetchChatRoom: jest.fn(),
}));

jest.mock('@/hooks/api/chat/useFetchChatList', () => ({
  useFetchChatList: jest.fn(),
}));

jest.mock('@/hooks/api/medicalCategory/useFetchMedicalSpecialities', () => ({
  useFetchMedicalSpecialities: jest.fn(),
}));

jest.mock('jotai', () => ({
  useAtomValue: jest.fn(),
}));

jest.mock('@/globalStates/group', () => ({
  isGroupSelectedState: jest.fn(),
}));

jest.mock('@/hooks/api/chat/useFetchUnreadCounts', () => ({
  mutateFetchUnreadCounts: jest.fn(),
}));

describe('useGroup', () => {
  describe('initialize', () => {
    beforeEach(() => {
      (useRouter as jest.Mock).mockReturnValue({
        query: { group_room_id: '1' },
      });
      (useWebSocket as jest.Mock).mockReturnValue({
        socket: {
          current: {
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
          },
        },
      });
      (useToken as jest.Mock).mockReturnValue({
        token: 'token',
        accountId: '1',
      });
      (useFetchChatRoomList as jest.Mock).mockReturnValue({
        data: [],
        mutate: jest.fn(),
      });
      (useFetchChatRoom as jest.Mock).mockReturnValue({
        data: {},
        mutate: jest.fn(),
      });
      (useFetchChatList as jest.Mock).mockReturnValue({
        data: [],
        mutate: jest.fn(),
      });
      (useFetchMedicalSpecialities as jest.Mock).mockReturnValue({
        medicalSpecialities: [],
      });
      (useAtomValue as jest.Mock).mockReturnValue(false);
    });

    test('初期値', async () => {
      const { result } = await act(async () => await renderHook(() => useGroup(), {}));

      await waitFor(() => {
        expect(result.current.group_room_id).toBe('1');
        expect(result.current.isGroupSelected).toBe(false);
        expect(result.current.groupRoomList).toEqual([]);
        expect(result.current.chatRoomData).toEqual({});
        expect(result.current.medicalSpecialities).toEqual([]);
        expect(result.current.chatListData).toEqual([]);
      });
    });

    test('group_room_idが変更されたとき', async () => {
      (useRouter as jest.Mock).mockReturnValue({
        query: { group_room_id: '2' },
      });

      const { result, rerender } = await act(async () => await renderHook(() => useGroup(), {}));

      rerender();

      await waitFor(() => {
        expect(result.current.group_room_id).toBe('2');
      });
    });

    test('WebSocketが開いたときにsubscribeメッセージを送信する', async () => {
      const mockWebSocket = {
        addEventListener: (event: string, callback: () => void) => {
          if (event === 'open') {
            callback();
          }
        },
        removeEventListener: jest.fn(),
        send: jest.fn(),
        readyState: WebSocket.OPEN,
      };

      (useWebSocket as jest.Mock).mockReturnValue({
        socket: {
          current: mockWebSocket,
        },
      });

      await act(async () => await renderHook(() => useGroup(), {}));

      expect(mockWebSocket.send).toHaveBeenCalledTimes(3);
      expect(mockWebSocket.send).toHaveBeenCalledWith(
        JSON.stringify({
          type: 'subscribe',
          token: 'token',
          param: 'mes:1',
        })
      );
      expect(mockWebSocket.send).toHaveBeenCalledWith(
        JSON.stringify({
          type: 'subscribe',
          token: 'token',
          param: 'cha:1',
        })
      );
      expect(mockWebSocket.send).toHaveBeenCalledWith(
        JSON.stringify({
          type: 'subscribe',
          token: 'token',
          param: 'vcs:1',
        })
      );
    });
  });
  test('pongが来たときにpingを送信する', async () => {
    const mockWebSocket = {
      addEventListener: (event: string, callback: (event: { data: string }) => void) => {
        if (event === 'message') {
          callback({ data: JSON.stringify({ type: 'pong' }) });
        }
      },
      removeEventListener: jest.fn(),
      send: jest.fn(),
      readyState: WebSocket.OPEN,
    };

    (useWebSocket as jest.Mock).mockReturnValue({
      socket: {
        current: mockWebSocket,
      },
    });

    jest.useFakeTimers();

    await act(async () => await renderHook(() => useGroup(), {}));

    jest.advanceTimersByTime(10000);

    expect(mockWebSocket.send).toHaveBeenCalledWith(
      JSON.stringify({
        type: 'ping',
        token: 'token',
      })
    );

    jest.useRealTimers();
  });
});
