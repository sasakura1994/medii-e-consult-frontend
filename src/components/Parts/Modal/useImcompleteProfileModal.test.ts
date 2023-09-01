import { useImcompleteProfileModal } from './useImcompleteProfileModal';
import { ProfileEntity } from '@/types/entities/profileEntity';
import 'cross-fetch/polyfill';
import { renderHook, act } from '@testing-library/react';
import * as useFetchProfileModule from '@/hooks/api/doctor/useFetchProfile';

jest.mock('@/hooks/api/doctor/useFetchProfile');

describe('useImcompleteProfileModal', () => {
  describe('url', () => {
    test('is_imperfect_profile', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          is_imperfect_profile: true,
          main_speciality: 'naika',
          need_to_send_confimation: false,
        } as ProfileEntity,
        isLoading: false,
      });
      let hookResult: { current: ReturnType<typeof useImcompleteProfileModal> } | undefined;

      await act(() => {
        hookResult = renderHook(() => useImcompleteProfileModal({})).result;
      });

      expect(hookResult?.current.url).toBe('/editProfile?registerMode=1');
    });

    test('main_speciality is empty', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          is_imperfect_profile: false,
          main_speciality: '',
          need_to_send_confimation: false,
        } as ProfileEntity,
        isLoading: false,
      });
      let hookResult: { current: ReturnType<typeof useImcompleteProfileModal> } | undefined;

      await act(() => {
        hookResult = renderHook(() => useImcompleteProfileModal({})).result;
      });

      expect(hookResult?.current.url).toBe('/editProfile?registerMode=1');
    });

    test('statusがPROFILEだと書類確認待ち', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          is_imperfect_profile: false,
          main_speciality: 'naika',
          need_to_send_confimation: true,
          status: 'PROFILE',
        } as ProfileEntity,
        isLoading: false,
      });
      let hookResult: { current: ReturnType<typeof useImcompleteProfileModal> } | undefined;

      await act(() => {
        hookResult = renderHook(() => useImcompleteProfileModal({})).result;
      });

      expect(hookResult?.current.url).toBe('/document');
    });

    test('Go to EditProfile', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          is_imperfect_profile: false,
          main_speciality: 'naika',
          need_to_send_confimation: false,
        } as ProfileEntity,
        isLoading: false,
      });
      let hookResult: { current: ReturnType<typeof useImcompleteProfileModal> } | undefined;

      await act(() => {
        hookResult = renderHook(() => useImcompleteProfileModal({})).result;
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
        hookResult = renderHook(() => useImcompleteProfileModal({})).result;
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
        hookResult = renderHook(() => useImcompleteProfileModal({})).result;
      });

      expect(hookResult?.current.isModalShown).toBeFalsy();
    });

    test('Not VERIFIED', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          status: 'PROFILE',
          is_imperfect_profile: false,
          main_speciality: 'naika',
          need_to_send_confimation: false,
        } as ProfileEntity,
        isLoading: false,
      });
      let hookResult: { current: ReturnType<typeof useImcompleteProfileModal> } | undefined;

      await act(() => {
        hookResult = renderHook(() => useImcompleteProfileModal({})).result;
      });

      expect(hookResult?.current.isModalShown).toBeTruthy();
    });

    test('Allow waiting', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          status: 'PROFILE',
          is_imperfect_profile: false,
          main_speciality: 'naika',
          need_to_send_confimation: false,
        } as ProfileEntity,
        isLoading: false,
      });
      let hookResult: { current: ReturnType<typeof useImcompleteProfileModal> } | undefined;

      await act(() => {
        hookResult = renderHook(() => useImcompleteProfileModal({ allowWaiting: true })).result;
      });

      expect(hookResult?.current.isModalShown).toBeFalsy();
    });

    test('Imcomplete', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          is_imperfect_profile: true,
          main_speciality: 'naika',
          need_to_send_confimation: true,
        } as ProfileEntity,
        isLoading: false,
      });
      let hookResult: { current: ReturnType<typeof useImcompleteProfileModal> } | undefined;

      await act(() => {
        hookResult = renderHook(() => useImcompleteProfileModal({ allowWaiting: true })).result;
      });

      expect(hookResult?.current.isModalShown).toBeTruthy();
    });
  });
});
