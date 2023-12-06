import { renderHook, act } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useDocument } from '../useDocument';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useFetchFlag } from '@/hooks/api/account/useFetchFlags';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/eventLog/useEventLog');
jest.mock('@/hooks/useLocalStorage');
jest.mock('@/hooks/api/account/useFetchFlags');

describe('useDocument', () => {
  (useEventLog as jest.Mock).mockReturnValue({
    postEventLog: jest.fn(),
  });

  describe('完了時', () => {
    test('完了後のページ（アンケート）へ', async () => {
      const push = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({
        push,
      });

      (useFetchFlag as jest.Mock).mockReturnValue({
        flag: false,
        isLoading: false,
      });

      const getItem = jest.fn();
      const removeItem = jest.fn();
      (useLocalStorage as jest.Mock).mockReturnValue({
        getItem,
        removeItem,
      });

      const { result } = renderHook(() => useDocument());

      await act(async () => {
        await result.current.setSelectedWithRedirect('completed');
      });

      expect(push).toBeCalledWith('/onboarding/questionary');
    });

    test('アンケート回答済みの場合はtopへ', async () => {
      const push = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({
        push,
      });

      (useFetchFlag as jest.Mock).mockReturnValue({
        flag: true,
        isLoading: false,
      });

      const getItem = jest.fn();
      const removeItem = jest.fn();
      (useLocalStorage as jest.Mock).mockReturnValue({
        getItem,
        removeItem,
      });

      const { result } = renderHook(() => useDocument());

      await act(async () => {
        await result.current.setSelectedWithRedirect('completed');
      });

      expect(push).toBeCalledWith('/top');
    });

    test('保存されていたページへ', async () => {
      const push = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({
        push,
      });

      (useFetchFlag as jest.Mock).mockReturnValue({
        flag: false,
        isLoading: false,
      });

      const getItem = jest.fn();
      getItem.mockReturnValue('/seminar');
      const removeItem = jest.fn();
      (useLocalStorage as jest.Mock).mockReturnValue({
        getItem,
        removeItem,
      });

      const { result } = renderHook(() => useDocument());

      await act(async () => {
        await result.current.setSelectedWithRedirect('completed');
      });

      expect(push).toBeCalledWith('/seminar');
    });
  });
});
