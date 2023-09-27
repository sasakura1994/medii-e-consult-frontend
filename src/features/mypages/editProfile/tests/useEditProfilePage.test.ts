import { RecoilRoot } from 'recoil';
import 'cross-fetch/polyfill';
import { renderHook } from '@testing-library/react';
import { useEditProfilePage } from '../useEditProfilePage';
import { useRouter } from 'next/router';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';

jest.mock('next/router');
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

      const hooks = await renderHook(() => useEditProfilePage(), {
        wrapper: RecoilRoot,
      }).result;

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

      const hooks = await renderHook(() => useEditProfilePage(), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.editProfileMode).toEqual('edit');
    });

    test('VERIFIEDでない場合は強制的に編集画面を表示', async () => {
      (useFetchProfile as jest.Mock).mockReturnValue({
        profile: { status: 'PROFILE', last_name: 'last_name' },
      });
      (useRouter as jest.Mock).mockReturnValue({
        query: {},
      });

      const hooks = await renderHook(() => useEditProfilePage(), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.editProfileMode).toEqual('edit');
    });

    test('氏名が入力されてない場合は強制的に編集画面を表示', async () => {
      (useFetchProfile as jest.Mock).mockReturnValue({
        profile: { status: 'VERIFIED', last_name: '' },
      });
      (useRouter as jest.Mock).mockReturnValue({
        query: {},
      });

      const hooks = await renderHook(() => useEditProfilePage(), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.editProfileMode).toEqual('edit');
    });
  });
});
