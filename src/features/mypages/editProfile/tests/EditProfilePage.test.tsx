import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';

import EditProfilePage from '@/pages/editprofile';
import { useRouter } from 'next/router';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/doctor/useFetchProfile');
jest.mock('@/libs/LocalStorageManager');

describe('/editprofile', () => {
  test('編集画面に切り替わること', async () => {
    const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
    (useRouterMock as jest.Mock).mockReturnValue({
      query: {},
      pathname: '',
    });

    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      profile: {
        status: 'VERIFIED',
        last_name: 'last name',
        birthday_year: 2000,
        birthday_month: 4,
        birthday_day: 1,
        qualified_year: 2020,
      },
    });

    render(<EditProfilePage />);

    const editProfileBtn = screen.getByTestId('btn-profile-edit');
    await act(() => {
      userEvent.click(editProfileBtn);
    });

    const headingEditProfileEdit = screen.getByTestId('h-edit-profile-edit');
    expect(headingEditProfileEdit).toBeInTheDocument();
  });
});
