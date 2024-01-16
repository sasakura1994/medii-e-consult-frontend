import 'cross-fetch/polyfill';
import { renderHook } from '@testing-library/react';
import { useExistCampaign } from './useExistCampaign';
import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';

jest.mock('@/hooks/network/useAuthenticatedSWR');

const today = new Date();

describe('useExistCampaign', () => {
  describe('isCampaign', () => {
    test('期間内', () => {
      (useAuthenticatedSWR as jest.Mock).mockReturnValue({
        data: {
          is_exist: true,
          start_at: new Date(today.getTime() - 1000).toISOString(),
          end_at: new Date(today.getTime() + 1000).toISOString(),
        },
      });

      const hooks = renderHook(() => useExistCampaign()).result;
      expect(hooks.current.isCampaign).toBeTruthy();
    });

    test('期間以前', () => {
      (useAuthenticatedSWR as jest.Mock).mockReturnValue({
        data: {
          is_exist: true,
          start_at: new Date(today.getTime() + 100).toISOString(),
          end_at: new Date(today.getTime() + 1000).toISOString(),
        },
      });

      const hooks = renderHook(() => useExistCampaign()).result;
      expect(hooks.current.isCampaign).toBeFalsy();
    });

    test('期間後', () => {
      (useAuthenticatedSWR as jest.Mock).mockReturnValue({
        data: {
          is_exist: true,
          start_at: new Date(today.getTime() - 1000).toISOString(),
          end_at: new Date(today.getTime() - 100).toISOString(),
        },
      });

      const hooks = renderHook(() => useExistCampaign()).result;
      expect(hooks.current.isCampaign).toBeFalsy();
    });

    test('キャンペーンがない', () => {
      (useAuthenticatedSWR as jest.Mock).mockReturnValue({
        data: {
          is_exist: false,
        },
      });

      const hooks = renderHook(() => useExistCampaign()).result;
      expect(hooks.current.isCampaign).toBeFalsy();
    });
  });
});
