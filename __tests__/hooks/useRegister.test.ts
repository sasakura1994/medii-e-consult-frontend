import { usePostLogin } from '@/hooks/api/doctor/usePostLogin';
import { useLogin } from '@/hooks/useLogin';
import { useRegister } from '@/hooks/useRegister';
import { act, renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';

jest.mock('next/router');
jest.mock('@/hooks/api/doctor/usePostLogin');

describe('useRegister', () => {
  describe('queryString', () => {
    test('クエリ文字列がある', () => {
      Object.defineProperty(window, 'location', {
        value: {
          search: '?redirect=/seminar',
        },
        writable: true,
      });

      const pushMock = jest.fn();
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: {},
        push: pushMock,
      });

      const hooks = renderHook(() => useRegister(), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.queryString).toBe('?redirect=/seminar');
    });
  });
});
