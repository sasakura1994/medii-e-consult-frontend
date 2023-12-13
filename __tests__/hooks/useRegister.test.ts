import { loginRedirectUrlKey } from '@/data/localStorage';
import { useAxios } from '@/hooks/network/useAxios';
import { useRegister } from '@/hooks/useRegister';
import { act, renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/doctor/usePostLogin');
jest.mock('@/hooks/network/useAxios');

describe('useRegister', () => {
  describe('queryString', () => {
    test('クエリ文字列がある', () => {
      Object.defineProperty(window, 'location', {
        value: {
          search: '?redirect=/seminar',
        },
        writable: true,
      });
      (useAxios as jest.Mock).mockReturnValue({
        axios: {},
      });

      const pushMock = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({
        query: {},
        push: pushMock,
      });

      const hooks = renderHook(() => useRegister(), {}).result;

      expect(hooks.current.loginUrl).toBe('/login?redirect=/seminar');
    });

    test('nmo再登録', async () => {
      (useRouter as jest.Mock).mockReturnValue({
        query: {
          from: 'nmo_registration_again',
          token: 'nmo_token',
        },
      });

      const post = jest.fn();
      post.mockResolvedValue(true);
      (useAxios as jest.Mock).mockReturnValue({
        axios: { post },
      });

      const hooks = renderHook(() => useRegister(), {}).result;

      await act(async () => await hooks.current.register());

      expect(post).toBeCalledWith('/doctor/create_account', {
        mail_address: '',
        queries: {
          from: 'nmo_registration_again',
        },
        token: 'nmo_token',
      });
    });
  });

  test('register', async () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');

    (useRouter as jest.Mock).mockReturnValue({
      query: { redirect: '/seminar' },
    });

    const post = jest.fn();
    post.mockResolvedValue({
      data: true,
    });
    (useAxios as jest.Mock).mockReturnValue({
      axios: {
        post,
      },
    });

    const hooks = renderHook(() => useRegister(), {}).result;

    act(() => {
      hooks.current.setEmail('test@example.com');
    });

    await act(() => hooks.current.register());

    expect(hooks.current.isSent).toBeTruthy();
    expect(setItem).toBeCalledWith(loginRedirectUrlKey, '/seminar');
  });
});
