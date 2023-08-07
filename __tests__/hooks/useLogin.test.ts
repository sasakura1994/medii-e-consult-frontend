import { usePostLogin } from '@/hooks/api/doctor/usePostLogin';
import { useLogin } from '@/hooks/useLogin';
import { act, renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';

jest.mock('next/router');
jest.mock('@/hooks/api/doctor/usePostLogin');

describe('useLogin', () => {
  describe('goToRegistration', () => {
    const usePostLoginMock = usePostLogin as jest.Mocked<typeof usePostLogin>;
    (usePostLoginMock as jest.Mock).mockReturnValue({
      login: jest.fn(),
    });

    test('パラメータ無し', () => {
      const pushMock = jest.fn();
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: {},
        push: pushMock,
      });

      const hooks = renderHook(() => useLogin(), {
        wrapper: RecoilRoot,
      }).result;

      act(() => hooks.current.goToRegistration());

      expect(pushMock).toBeCalledWith('/registration');
    });

    test('クエリパラメータあり', () => {
      const pushMock = jest.fn();
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: {
          redirect: '/seminar',
          aa: '11',
          bb: '22',
        },
        push: pushMock,
      });

      const hooks = renderHook(() => useLogin(), {
        wrapper: RecoilRoot,
      }).result;

      act(() => hooks.current.goToRegistration());

      expect(pushMock).toBeCalledWith('/registration?redirect=%2Fseminar&aa=11&bb=22');
    });
  });

  describe('症例バンクの場合のリダイレクト', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: {
          href: '',
        },
        writable: true,
      });
    });

    test('症例バンクの場合のリダイレクト', async () => {
      const pushMock = jest.fn();
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: {
          from: 'case_bank',
        },
        push: pushMock,
      });

      const login = jest.fn();
      login.mockResolvedValue({ data: { jwt_token: 'token' } });
      const usePostLoginMock = usePostLogin as jest.Mocked<typeof usePostLogin>;
      (usePostLoginMock as jest.Mock).mockReturnValue({
        login,
      });

      const hooks = renderHook(() => useLogin(), {
        wrapper: RecoilRoot,
      }).result;

      await act(() =>
        hooks.current.login({ preventDefault: jest.fn() } as unknown as React.FormEvent<HTMLFormElement>)
      );

      expect(window.location.href).toBe(process.env.CASE_BANK_URL + '/login/callback?t=token');
    });
  });
});
