import 'cross-fetch/polyfill';
import { renderHook } from '@testing-library/react';
import { useEditProfilePage } from '../useEditProfilePage';
import { useRouter } from 'next/router';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/doctor/useFetchProfile');

describe('useEditProfilePage', () => {
  describe('editProfileMode', () => {
    test('通常はプロフィール表示', async () => {
      (useFetchProfile as jest.Mock).mockReturnValue({
        profile: { status: 'VERIFIED', last_name: 'last_name' },
      });
      (useRouter as jest.Mock).mockReturnValue({
        query: {},
      });

      const hooks = await renderHook(() => useEditProfilePage(), {}).result;

      expect(hooks.current.editProfileMode).toEqual('profile');
    });

    test('登録モードのクエリがある場合は強制的に編集画面を表示', async () => {
      (useFetchProfile as jest.Mock).mockReturnValue({
        profile: { status: 'VERIFIED', last_name: 'last_name' },
      });
      (useRouter as jest.Mock).mockReturnValue({
        query: {
          registerMode: 'true',
        },
      });

      const hooks = await renderHook(() => useEditProfilePage(), {}).result;

      expect(hooks.current.editProfileMode).toEqual('edit');
    });

    describe('VERIFIEDでもPENDINGでもない場合は強制的に編集画面を表示', () => {
      test('PROFILE', async () => {
        (useFetchProfile as jest.Mock).mockReturnValue({
          profile: { status: 'PROFILE', last_name: 'last_name' },
        });
        (useRouter as jest.Mock).mockReturnValue({
          query: {},
        });

        const hooks = await renderHook(() => useEditProfilePage(), {}).result;

        expect(hooks.current.editProfileMode).toEqual('edit');
      });

      test('VERIFIED', async () => {
        (useFetchProfile as jest.Mock).mockReturnValue({
          profile: { status: 'VERIFIED', last_name: 'last_name' },
        });
        (useRouter as jest.Mock).mockReturnValue({
          query: {},
        });

        const hooks = await renderHook(() => useEditProfilePage(), {}).result;

        expect(hooks.current.editProfileMode).toEqual('profile');
      });

      test('PENDING*', async () => {
        (useFetchProfile as jest.Mock).mockReturnValue({
          profile: { status: 'PENDING_AUTO', last_name: 'last_name' },
        });
        (useRouter as jest.Mock).mockReturnValue({
          query: {},
        });

        const hooks = await renderHook(() => useEditProfilePage(), {}).result;

        expect(hooks.current.editProfileMode).toEqual('profile');
      });
    });

    test('氏名が入力されてない場合は強制的に編集画面を表示', async () => {
      (useFetchProfile as jest.Mock).mockReturnValue({
        profile: { status: 'VERIFIED', last_name: '' },
      });
      (useRouter as jest.Mock).mockReturnValue({
        query: {},
      });

      const hooks = await renderHook(() => useEditProfilePage(), {}).result;

      expect(hooks.current.editProfileMode).toEqual('edit');
    });
  });
});
