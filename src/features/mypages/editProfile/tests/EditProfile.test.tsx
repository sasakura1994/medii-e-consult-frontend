import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';

import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { EditProfile } from '../EditProfile';
import userEvent from '@testing-library/user-event';

jest.mock('@/hooks/api/doctor/useFetchProfile');
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({
    isReady: true,
  }),
}));
describe('EditProfile', () => {
  describe('医師＆医学生', () => {
    test('医師', async () => {
      (useFetchProfile as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          registration_source: '',
        },
      });

      await act(() => {
        render(<EditProfile isRegisterMode={true} />);
      });

      act(() => userEvent.click(screen.getByTestId('account-type-doctor')));

      await waitFor(() => {
        expect(screen.queryByTestId('edit-profile-doctor')).toBeInTheDocument();
      });
    });

    test('医学生', async () => {
      (useFetchProfile as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          registration_source: '',
        },
      });

      await act(() => {
        render(<EditProfile isRegisterMode={true} />);
      });

      act(() => userEvent.click(screen.getByTestId('account-type-student')));

      await waitFor(() => {
        expect(screen.queryByTestId('edit-profile-student')).toBeInTheDocument();
      });
    });

    test('編集画面では表示しない', async () => {
      (useFetchProfile as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          registration_source: '',
        },
      });

      await act(() => {
        render(<EditProfile isRegisterMode={false} />);
      });

      expect(screen.queryByTestId('account-type-student')).not.toBeInTheDocument();
    });
  });

  test('nmoの場合は利用区分を表示しない', async () => {
    (useFetchProfile as jest.Mock).mockReturnValue({
      profile: {
        birthday_year: 2000,
        birthday_month: 4,
        birthday_day: 1,
        qualified_year: 2020,
        registration_source: 'nmo',
      },
    });

    await act(() => {
      render(<EditProfile isRegisterMode={false} />);
    });

    const editProfileUsageClassification = await act(
      async () => await waitFor(() => screen.queryByTestId('edit-profile-usage-classification'))
    );
    expect(editProfileUsageClassification).not.toBeInTheDocument();
  });

  describe('アカウント作成時', () => {
    test('アカウント削除リンクを表示しない', async () => {
      (useFetchProfile as jest.Mock).mockReturnValue({
        profile: {
          birthday_year: 2000,
          birthday_month: 4,
          birthday_day: 1,
          qualified_year: 2020,
          registration_source: '',
        },
      });

      await act(() => {
        render(<EditProfile isRegisterMode={true} />);
      });

      await waitFor(() => {
        expect(screen.queryByTestId('submit-button')).toBeInTheDocument();
        expect(screen.queryByTestId('withdrawal-button')).not.toBeInTheDocument();
      });
    });
  });
});
