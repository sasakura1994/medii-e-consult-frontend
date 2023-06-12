import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { ImcompleteProfileModal } from './ImcompleteProfileModal';
import * as useFetchProfileModule from '@/hooks/api/doctor/useFetchProfile';
import { ProfileEntity } from '@/types/entities/profileEntity';

jest.mock('@/hooks/api/doctor/useFetchProfile');

describe('is_imperfect_profile', () => {
  describe('message', () => {
    test('is_imperfect_profile', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<
        typeof useFetchProfileModule
      >;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          is_imperfect_profile: true,
          main_speciality: 'naika',
          need_to_send_confimation: true,
        } as ProfileEntity,
      });

      await render(
        <RecoilRoot>
          <ImcompleteProfileModal />
        </RecoilRoot>
      );

      expect(
        screen.getByText(/プロフィール情報が入力されておりません。/)
      ).toBeInTheDocument();
    });

    test('need_to_send_confimation', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<
        typeof useFetchProfileModule
      >;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          is_imperfect_profile: false,
          main_speciality: 'naika',
          need_to_send_confimation: true,
        } as ProfileEntity,
      });

      await render(
        <RecoilRoot>
          <ImcompleteProfileModal />
        </RecoilRoot>
      );

      expect(
        screen.getByText(/確認資料が提出されておりません。/)
      ).toBeInTheDocument();
    });

    test('デフォルト', async () => {
      const useFetchProfileMock = useFetchProfileModule as jest.Mocked<
        typeof useFetchProfileModule
      >;
      useFetchProfileMock.useFetchProfile.mockReturnValue({
        profile: {
          is_imperfect_profile: false,
          main_speciality: 'naika',
          need_to_send_confimation: false,
        } as ProfileEntity,
      });

      await render(
        <RecoilRoot>
          <ImcompleteProfileModal />
        </RecoilRoot>
      );

      expect(
        screen.getByText(/現在、ご提出頂いた資料を確認中です。/)
      ).toBeInTheDocument();
    });
  });
});
