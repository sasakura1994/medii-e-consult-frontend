import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { ImcompleteProfileModal } from './ImcompleteProfileModal';
import * as useFetchProfileModule from '@/hooks/api/doctor/useFetchProfile';
import { ProfileEntity } from '@/types/entities/profileEntity';

jest.mock('@/hooks/api/doctor/useFetchProfile');

describe('is_imperfect_profile', () => {
  describe('message', () => {
    test('is_imperfect_profile', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          is_imperfect_profile: true,
          main_speciality: 'naika',
          need_to_send_confimation: true,
        } as ProfileEntity,
        isLoading: false,
      });

      await act(() => {
        render(
          <RecoilRoot>
            <ImcompleteProfileModal />
          </RecoilRoot>
        );
      });

      const text = await act(async () => {
        return waitFor(() => screen.getByText(/プロフィール情報が入力されておりません。/));
      });
      expect(text).toBeInTheDocument();
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

      await act(() => {
        render(
          <RecoilRoot>
            <ImcompleteProfileModal />
          </RecoilRoot>
        );
      });

      const text = await act(async () => {
        return await waitFor(() => screen.getByText(/確認資料が提出されておりません。/));
      });
      expect(text).toBeInTheDocument();
    });
  });

  test('表示しない', async () => {
    const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
    useFetchProfileMock.useFetchProfile.mockReturnValue({
      profile: {
        is_imperfect_profile: false,
        main_speciality: 'naika',
        need_to_send_confimation: false,
      } as ProfileEntity,
      isLoading: false,
    });

    await act(() => {
      render(
        <RecoilRoot>
          <ImcompleteProfileModal />
        </RecoilRoot>
      );
    });

    const text = await act(async () => {
      return waitFor(() => screen.queryByTestId('imcomplete-profile-modal'));
    });
    expect(text).not.toBeInTheDocument();
  });
});
