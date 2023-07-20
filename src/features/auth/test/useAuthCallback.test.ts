import 'cross-fetch/polyfill';
import { renderHook, waitFor } from '@testing-library/react';
import { useAuthCallback } from '../useAuthCallback';
import { useToken } from '@/hooks/authentication/useToken';
import { useRouter } from 'next/router';
import { useAxios } from '@/hooks/network/useAxios';

jest.mock('next/router');
jest.mock('@/hooks/network/useAxios');
jest.mock('@/hooks/authentication/useToken');

describe('useAuthCallback', () => {
  test('ログイン', async () => {
    const pushMock = jest.fn();
    const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
    (useRouterMock as jest.Mock).mockReturnValue({
      query: {
        key: 'ky012345678901234567890123456789',
        ttl: '10000',
        redirect: 'https://example.com',
      },
      push: pushMock,
    });

    const postMock = jest.fn();
    postMock.mockResolvedValue({
      data: {
        jwt_token: 'token',
      },
    });
    const useAxiosMock = useAxios as jest.Mocked<typeof useAxios>;
    (useAxiosMock as jest.Mock).mockReturnValue({
      axios: {
        post: postMock,
      },
    });

    const setTokenAndMarkInitializedMock = jest.fn();
    const useTokenMock = useToken as jest.Mocked<typeof useToken>;
    (useTokenMock as jest.Mock).mockReturnValue({
      setTokenAndMarkInitialized: setTokenAndMarkInitializedMock,
    });

    await renderHook(() => useAuthCallback()).result;

    waitFor(() => {
      expect(setTokenAndMarkInitializedMock).toBeCalledWith('token');
      expect(pushMock).toBeCalledWith('https://example.com');
    });
  });
});
