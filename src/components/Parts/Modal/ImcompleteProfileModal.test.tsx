import React from 'react';
import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { ImcompleteProfileModal } from './ImcompleteProfileModal';
import * as useFetchProfileModule from '@/hooks/api/doctor/useFetchProfile';
import { ProfileEntity } from '@/types/entities/profileEntity';

jest.mock('@/hooks/api/doctor/useFetchProfile');

describe('is_imperfect_profile', () => {
  describe('message', () => {
    describe('status === CREATED', () => {
      test('プロフィール情報入力が必要', async () => {
        const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
        useFetchProfileMock.useFetchProfile.mockReturnValue({
          profile: {
            main_speciality: 'naika',
            status: 'CREATED',
          } as ProfileEntity,
          isLoading: false,
        });

        act(() => {
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

      test('nmoの場合は条件に該当しても表示しない', async () => {
        const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
        useFetchProfileMock.useFetchProfile.mockReturnValue({
          profile: {
            main_speciality: 'naika',
            status: 'CREATED',
            registration_source: 'nmo',
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
          return waitFor(() => screen.queryByText(/プロフィール情報が入力されておりません。/));
        });
        expect(text).not.toBeInTheDocument();
      });
    });

    test('status === PROFILE', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          main_speciality: 'naika',
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
        status: 'VERIFIED',
        main_speciality: 'naika',
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
