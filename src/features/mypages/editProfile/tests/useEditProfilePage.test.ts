import { RecoilRoot } from 'recoil';
import 'cross-fetch/polyfill';
import { renderHook } from '@testing-library/react';
import { useEditProfilePage } from '../useEditProfilePage';
import { useRouter } from 'next/router';

jest.mock('next/router');

describe('useEditProfilePage', () => {
  describe('editProfileMode', () => {
    test('登録モードのクエリがある場合は強制的に編集画面を表示', async () => {
      const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
      (useRouterMock as jest.Mock).mockReturnValue({
        query: {
          registerMode: 'true',
        },
      });

      const hooks = await renderHook(() => useEditProfilePage(), {
        wrapper: RecoilRoot,
      }).result;

      expect(hooks.current.editProfileMode).toEqual('edit');
    });
  });
});
