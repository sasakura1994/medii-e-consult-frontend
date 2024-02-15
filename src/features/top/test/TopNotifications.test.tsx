import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

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
        await render(<TopNotifications />);
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
        await render(<TopNotifications />);
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
        await render(<TopNotifications />);
      });

      expect(screen.queryByTestId('top-notification-pending')).toBeInTheDocument();
    });
  });

  test('代理登録のためプロフィールが不足している場合', async () => {
    (useFetchProfile as jest.Mock).mockReturnValue({
      profile: {
        registration_source: '',
        last_name_hira: 'name',
        status: 'VERIFIED',
        birthday_year: 9999,
      },
    });

    await act(async () => {
      await render(<TopNotifications />);
    });

    expect(screen.queryByTestId('top-notification-input-profile')).toBeInTheDocument();
  });

  test('医学生から医師への変更メッセージ', async () => {
    (useFetchProfile as jest.Mock).mockReturnValue({
      profile: {
        registration_source: '',
        last_name_hira: 'name',
        main_speciality: 'STUDENT',
        status: 'VERIFIED',
        graduation_year: 2000,
        birthday_year: 9999,
      },
    });

    await act(async () => {
      await render(<TopNotifications />);
    });

    expect(screen.queryByTestId('top-notification-student-to-doctor')).toBeInTheDocument();
  });
});
