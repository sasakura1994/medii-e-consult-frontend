import 'cross-fetch/polyfill';
import { act, renderHook } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useFillProfile } from '../useFillProfile';
import { useUpdateProfile } from '@/hooks/api/doctor/useUpdateProfile';
import { useEditProfile } from '@/features/mypages/editProfile/useEditProfile';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/doctor/useUpdateProfile');
jest.mock('@/features/mypages/editProfile/useEditProfile');
jest.mock('@/hooks/api/doctor/useFetchProfile');

const useUpdateProfileMock = useUpdateProfile as jest.Mocked<typeof useUpdateProfile>;
(useUpdateProfileMock as jest.Mock).mockReturnValue({
  updateProfile: jest.fn(),
});

describe('useFillProfile', () => {
  describe('初期化', () => {
    test('アクセス可能', async () => {
      const profile = {
        last_name_hira: 'name',
        birthday_year: 9999,
        status: 'VERIFIED',
      };

      const saveProfileMock = jest.fn();
      saveProfileMock.mockResolvedValue(true);
      const useEditProfileMock = useEditProfile as jest.Mocked<typeof useEditProfile>;
      (useEditProfileMock as jest.Mock).mockReturnValue({
        profile,
        saveProfile: saveProfileMock,
      });

      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile,
      });

      const pushMock = jest.fn();
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: {},
        push: pushMock,
      });

      await renderHook(() => useFillProfile(), {}).result;

      expect(pushMock).not.toBeCalled();
    });

    test('入力済みの場合はリダイレクト', async () => {
      const profile = {
        last_name_hira: 'なまえ',
        birthday_year: 1999,
        status: 'VERIFIED',
      };
      const saveProfileMock = jest.fn();
      saveProfileMock.mockResolvedValue(true);
      const useEditProfileMock = useEditProfile as jest.Mocked<typeof useEditProfile>;
      (useEditProfileMock as jest.Mock).mockReturnValue({
        profile,
        saveProfile: saveProfileMock,
      });

      const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
      (useFetchProfileMock as jest.Mock).mockReturnValue({
        profile,
      });

      const pushMock = jest.fn();
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: {},
        push: pushMock,
      });

      await renderHook(() => useFillProfile(), {}).result;

      expect(pushMock).toBeCalledWith('/top');
    });
  });

  describe('完了時リダイレクト', () => {
    const profile = {
      last_name_hira: 'name',
      birthday_year: 9999,
      status: 'VERIFIED',
    };
    const saveProfileMock = jest.fn();
    saveProfileMock.mockResolvedValue(true);
    const useEditProfileMock = useEditProfile as jest.Mocked<typeof useEditProfile>;
    (useEditProfileMock as jest.Mock).mockReturnValue({
      profile,
      saveProfile: saveProfileMock,
    });

    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      profile,
    });

    test('通常はトップページに戻る', async () => {
      const pushMock = jest.fn();
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: {},
        push: pushMock,
      });

      const hooks = await renderHook(() => useFillProfile(), {}).result;

      await act(async () => await hooks.current.submitFillProfile());

      expect(pushMock).toBeCalledWith('/top');
    });

    test('リダイレクト指定がある場合', async () => {
      const pushMock = jest.fn();
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: { redirect: '/newchatroom' },
        push: pushMock,
      });

      const hooks = await renderHook(() => useFillProfile(), {}).result;

      await act(async () => await hooks.current.submitFillProfile());

      expect(pushMock).toBeCalledWith('/newchatroom');
    });
  });
});
