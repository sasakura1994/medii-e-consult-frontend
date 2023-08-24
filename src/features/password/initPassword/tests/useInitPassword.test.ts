import { renderHook, act } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useInitPassword } from '../useInitPassword';
import { useRouter } from 'next/router';
import { usePostSetPassword } from '@/hooks/api/account/usePostSetPassword';
import { usePostHufUser } from '@/hooks/api/account/usePostHufUser';
import { FormEvent } from 'react';

jest.mock('next/router');
jest.mock('@/hooks/api/account/usePostSetPassword');
jest.mock('@/hooks/api/account/usePostHufUser');

describe('useInitPassword', () => {
  describe('isTokenExists', () => {
    (usePostSetPassword as jest.Mock).mockReturnValue({
      setPassword: jest.fn(),
    });
    (usePostHufUser as jest.Mock).mockReturnValue({
      createHufUser: jest.fn(),
    });

    test('通常のトークンがある', async () => {
      (useRouter as jest.Mock).mockReturnValue({
        query: {
          token: 'token',
        },
      });

      const hooks = renderHook(() => useInitPassword(), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.isTokenExists).toBeTruthy();
    });

    test('HUFのトークンがある', async () => {
      (useRouter as jest.Mock).mockReturnValue({
        query: {
          huf_token: 'huf_token',
        },
      });

      const hooks = renderHook(() => useInitPassword(), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.isTokenExists).toBeTruthy();
    });

    test('トークンがない', async () => {
      (useRouter as jest.Mock).mockReturnValue({
        query: {},
      });

      const hooks = renderHook(() => useInitPassword(), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.isTokenExists).toBeFalsy();
    });
  });

  test('正常なトークンでパスワード設定', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        token: 'token',
      },
      push: pushMock,
    });

    const setPassword = jest.fn();
    setPassword.mockResolvedValue({
      data: {
        code: 1,
      },
    });
    (usePostSetPassword as jest.Mock).mockReturnValue({
      setPassword,
    });

    (usePostHufUser as jest.Mock).mockReturnValue({
      createHufUser: jest.fn(),
    });

    const hooks = renderHook(() => useInitPassword(), {
      wrapper: RecoilRoot,
    }).result;

    act(() => hooks.current.setIsPrivacyPolicyAgreed(true));
    act(() => hooks.current.setIsTermsOfUseAgreed(true));
    act(() => hooks.current.setIsRead(true));
    await act(async () => {
      await hooks.current.onSubmit({
        preventDefault: () => {
          return;
        },
      } as FormEvent<HTMLFormElement>);
    });

    expect(setPassword).toBeCalled();
    expect(pushMock).toBeCalled();
  });

  test('HUFユーザーの場合', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        huf_token: 'huf_token',
      },
      push: pushMock,
    });

    (usePostSetPassword as jest.Mock).mockReturnValue({
      setPassword: jest.fn(),
    });

    const createHufUser = jest.fn();
    createHufUser.mockResolvedValue({
      data: {
        code: 1,
      },
    });
    (usePostHufUser as jest.Mock).mockReturnValue({
      createHufUser,
    });

    const hooks = renderHook(() => useInitPassword(), {
      wrapper: RecoilRoot,
    }).result;

    act(() => hooks.current.setIsPrivacyPolicyAgreed(true));
    act(() => hooks.current.setIsTermsOfUseAgreed(true));
    act(() => hooks.current.setIsRead(true));
    await act(async () => {
      await hooks.current.onSubmit({
        preventDefault: () => {
          return;
        },
      } as FormEvent<HTMLFormElement>);
    });

    expect(createHufUser).toBeCalled();
    expect(pushMock).toBeCalled();
  });
});
