import { useImcompleteProfileModal } from './useImcompleteProfileModal';
import { ProfileEntity } from '@/types/entities/profileEntity';
import 'cross-fetch/polyfill';
import { renderHook, act } from '@testing-library/react';
import * as useFetchProfileModule from '@/hooks/api/doctor/useFetchProfile';

jest.mock('@/hooks/api/doctor/useFetchProfile');

describe('useImcompleteProfileModal', () => {
  describe('url', () => {
    test('status === CREATED', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          status: 'CREATED',
          main_speciality: 'naika',
        } as ProfileEntity,
        isLoading: false,
      });
      let hookResult: { current: ReturnType<typeof useImcompleteProfileModal> } | undefined;

      await act(() => {
        hookResult = renderHook(() => useImcompleteProfileModal()).result;
      });

      expect(hookResult?.current.url).toBe('/editProfile?registerMode=1');
    });

    test('main_speciality is empty', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          status: 'VERIFIED',
          main_speciality: '',
        } as ProfileEntity,
        isLoading: false,
      });
      let hookResult: { current: ReturnType<typeof useImcompleteProfileModal> } | undefined;

      await act(() => {
        hookResult = renderHook(() => useImcompleteProfileModal()).result;
      });

      expect(hookResult?.current.url).toBe('/editProfile?registerMode=1');
    });

    test('statusがPROFILEだと書類確認待ち', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          main_speciality: 'naika',
          status: 'PROFILE',
        } as ProfileEntity,
        isLoading: false,
      });
      let hookResult: { current: ReturnType<typeof useImcompleteProfileModal> } | undefined;

      await act(() => {
        hookResult = renderHook(() => useImcompleteProfileModal()).result;
      });

      expect(hookResult?.current.url).toBe('/document');
    });

    test('Go to EditProfile', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          main_speciality: 'naika',
          status: 'VERIFIED',
        } as ProfileEntity,
        isLoading: false,
      });
      let hookResult: { current: ReturnType<typeof useImcompleteProfileModal> } | undefined;

      await act(() => {
        hookResult = renderHook(() => useImcompleteProfileModal()).result;
      });

      expect(hookResult?.current.url).toBe('/EditProfile');
    });
  });

  describe('isModalShown', () => {
    test('Loading profile', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: undefined,
        isLoading: true,
      });
      let hookResult: { current: ReturnType<typeof useImcompleteProfileModal> } | undefined;

      await act(() => {
        hookResult = renderHook(() => useImcompleteProfileModal()).result;
      });

      expect(hookResult?.current.isModalShown).toBeFalsy();
    });

    test('VERIFIED', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          status: 'VERIFIED',
        } as ProfileEntity,
        isLoading: false,
      });
      let hookResult: { current: ReturnType<typeof useImcompleteProfileModal> } | undefined;

      await act(() => {
        hookResult = renderHook(() => useImcompleteProfileModal()).result;
      });

      expect(hookResult?.current.isModalShown).toBeFalsy();
    });

    test('Not VERIFIED', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          status: 'PROFILE',
          main_speciality: 'naika',
        } as ProfileEntity,
        isLoading: false,
      });
      let hookResult: { current: ReturnType<typeof useImcompleteProfileModal> } | undefined;

      await act(() => {
        hookResult = renderHook(() => useImcompleteProfileModal()).result;
      });

      expect(hookResult?.current.isModalShown).toBeTruthy();
    });

    test('nmoの場合は他の条件に関わらず非表示', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          main_speciality: 'naika',
          status: 'PROFILE',
          registration_source: 'nmo',
        } as ProfileEntity,
        isLoading: false,
      });
      let hookResult: { current: ReturnType<typeof useImcompleteProfileModal> } | undefined;

      await act(() => {
        hookResult = renderHook(() => useImcompleteProfileModal()).result;
      });

      expect(hookResult?.current.isModalShown).toBeFalsy();
    });
  });
});
