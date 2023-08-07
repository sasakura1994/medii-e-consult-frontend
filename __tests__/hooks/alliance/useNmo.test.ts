import { useNmo } from '@/hooks/alliance/useNmo';
import { renderHook } from '@testing-library/react';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';

jest.mock('@/hooks/api/doctor/useFetchProfile');

describe('useNmo', () => {
  describe('isNeedToInputProfile', () => {
    test('true', () => {
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {
          registration_source: 'nmo',
          last_name_hira: '',
        },
      });

      const { result } = renderHook(() => useNmo());

      expect(result.current.isNeedToInputProfile).toBeTruthy();
    });

    test('false(nmoではない)', () => {
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {
          registration_source: 'google',
          last_name_hira: '',
        },
      });

      const { result } = renderHook(() => useNmo());

      expect(result.current.isNeedToInputProfile).toBeFalsy();
    });

    test('false(プロフィール入力済み)', () => {
      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile: {
          registration_source: 'nmo',
          last_name_hira: 'なまえ',
        },
      });

      const { result } = renderHook(() => useNmo());

      expect(result.current.isNeedToInputProfile).toBeFalsy();
    });
  });
});
