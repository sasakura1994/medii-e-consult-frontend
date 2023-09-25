import { loginRedirectUrlKey } from '@/data/localStorage';
import { useAxios } from '@/hooks/network/useAxios';
import { useRegister } from '@/hooks/useRegister';
import { act, renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';

jest.mock('next/router');
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

      const hooks = renderHook(() => useRegister(), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.loginUrl).toBe('/login?redirect=/seminar');
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

    const hooks = renderHook(() => useRegister(), {
      wrapper: RecoilRoot,
    }).result;

    act(() => {
      hooks.current.setEmail('test@example.com');
      hooks.current.setIsPrivacyPolicyAgree(true);
      hooks.current.setIsTermsAgree(true);
    });

    await act(() => hooks.current.register());

    expect(hooks.current.isSent).toBeTruthy();
    expect(setItem).toBeCalledWith(loginRedirectUrlKey, '/seminar');
  });

  test('goToSnsLogin', async () => {
    const setItem = jest.spyOn(Storage.prototype, 'setItem');

    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: { redirect: '/seminar', p: 'accountid' },
      push: pushMock,
    });

    (useAxios as jest.Mock).mockReturnValue({
      axios: {},
    });

    const hooks = renderHook(() => useRegister(), {
      wrapper: RecoilRoot,
    }).result;

    act(() => {
      hooks.current.setIsPrivacyPolicyAgree(true);
      hooks.current.setIsTermsAgree(true);
    });

    await act(() => hooks.current.goToSnsLogin());

    expect(setItem).toBeCalledWith(loginRedirectUrlKey, '/seminar');
    expect(pushMock).toBeCalledWith('/snsregistration?p=accountid');
  });
});
