import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { RecoilRoot } from 'recoil';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { TopNotifications } from '../TopNotifications';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/doctor/useFetchProfile');

describe('TopNotifications', () => {
  describe('プロフィールの状況', () => {
    test('プロフィール未入力', async () => {
      (useFetchProfile as jest.Mock).mockReturnValue({
        profile: {
          status: 'CREATED',
        },
      });

      await act(async () => {
        await render(
          <RecoilRoot>
            <TopNotifications />
          </RecoilRoot>
        );
      });

      expect(screen.queryByTestId('top-notification-is-imperfect-profile')).toBeInTheDocument();
    });

    test('医師確認未送信', async () => {
      (useFetchProfile as jest.Mock).mockReturnValue({
        profile: {
          status: 'PROFILE',
        },
      });

      await act(async () => {
        await render(
          <RecoilRoot>
            <TopNotifications />
          </RecoilRoot>
        );
      });

      expect(screen.queryByTestId('top-notification-need-to-send-confirmation')).toBeInTheDocument();
    });

    test('医師確認承認待ち', async () => {
      (useFetchProfile as jest.Mock).mockReturnValue({
        profile: {
          status: 'PENDING_AUTO',
        },
      });

      await act(async () => {
        await render(
          <RecoilRoot>
            <TopNotifications />
          </RecoilRoot>
        );
      });

      expect(screen.queryByTestId('top-notification-pending')).toBeInTheDocument();
    });
  });

  test('nmoのためプロフィールが不足している場合', async () => {
    (useFetchProfile as jest.Mock).mockReturnValue({
      profile: {
        registration_source: 'nmo',
        last_name_hira: '',
        status: 'CREATED',
      },
    });

    await act(async () => {
      await render(
        <RecoilRoot>
          <TopNotifications />
        </RecoilRoot>
      );
    });

    expect(screen.queryByTestId('top-notification-nmo-input-profile')).toBeInTheDocument();
  });
});
