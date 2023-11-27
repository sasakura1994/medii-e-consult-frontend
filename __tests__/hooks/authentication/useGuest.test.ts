import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useGuest } from '@/hooks/authentication/useGuest';
import { renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/doctor/useFetchProfile');

describe('useGuest', () => {
  describe('ゲストのアクセスを制限', () => {
    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      profile: {
        is_guest: true,
      },
    });

    test('許可されたURLはアクセスできる', () => {
      const pushMock = jest.fn();
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
        pathname: '/top',
        push: pushMock,
      });

      renderHook(() => useGuest(), {}).result;

      expect(pushMock).not.toBeCalled();
    });

    test('ルートも許可', () => {
      const pushMock = jest.fn();
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
        pathname: '/',
        push: pushMock,
      });

      renderHook(() => useGuest(), {}).result;

      expect(pushMock).not.toBeCalled();
    });

    test('許可されていないURLはguestページにリダイレクト', () => {
      const pushMock = jest.fn();
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
        pathname: '/examplelist',
        push: pushMock,
      });

      renderHook(() => useGuest(), {}).result;

      expect(pushMock).toBeCalledWith(`/guest?redirect=${encodeURIComponent('/examplelist')}`);
    });
  });
});
