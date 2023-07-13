import 'cross-fetch/polyfill';
import { renderHook } from '@testing-library/react';
import { useNewChatRoom } from '../useNewChatRoom';
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';

jest.mock('next/router');

describe('useNewChatROom', () => {
  describe('chatRoom', () => {
    test('room_type:専門医指定方法のクエリが存在', () => {
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: { room_type: 'BY_NAME' },
      });

      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      expect(result.current.chatRoom.room_type).toBe('BY_NAME');
    });

    test('target_account_id:医師を指定', () => {
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: { target_account_id: 'accountid' },
      });

      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      expect(result.current.chatRoom.target_doctor).toBe('accountid');
      expect(result.current.chatRoom.room_type).toBe('BY_NAME');
    });

    test('target_group_id:グループを指定', () => {
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: { target_group_id: 'group1' },
      });

      const { result } = renderHook(() => useNewChatRoom(), {
        wrapper: RecoilRoot,
      });

      expect(result.current.chatRoom.group_id).toBe('group1');
      expect(result.current.chatRoom.room_type).toBe('GROUP');
    });
  });
});
