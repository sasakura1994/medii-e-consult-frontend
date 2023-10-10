import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import EditProfilePage from '@/pages/editprofile';
import { useRouter } from 'next/router';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { loadLocalStorage } from '@/libs/LocalStorageManager';
import { ProfileEntity } from '@/types/entities/profileEntity';

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

    render(
      <RecoilRoot>
        <EditProfilePage />
      </RecoilRoot>
    );

    const editProfileBtn = screen.getByTestId('btn-profile-edit');
    await act(() => {
      userEvent.click(editProfileBtn);
    });

    const headingEditProfileEdit = screen.getByTestId('h-edit-profile-edit');
    expect(headingEditProfileEdit).toBeInTheDocument();
    expect(screen.queryByTestId('edit-profile-notification')).not.toBeInTheDocument();
    expect(screen.queryByTestId('edit-profile-questionary')).not.toBeInTheDocument();
  });

  test('編集時はアンケートと通知設置を表示する', async () => {
    const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
    (useRouterMock as jest.Mock).mockReturnValue({
      query: { registerMode: 'true' },
    });

    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      profile: {
        birthday_year: 2000,
        birthday_month: 4,
        birthday_day: 1,
        qualified_year: 2020,
      },
    });

    const loadLocalStorageMock = loadLocalStorage as jest.Mocked<typeof loadLocalStorage>;
    (loadLocalStorageMock as jest.Mock).mockReturnValue(
      JSON.stringify({
        last_name: 'draft_last_name',
        hospital_id: '',
        hospital_name: 'free input',
      } as ProfileEntity)
    );

    render(
      <RecoilRoot>
        <EditProfilePage />
      </RecoilRoot>
    );

    expect(screen.queryByTestId('edit-profile-notification')).toBeInTheDocument();
    expect(screen.queryByTestId('edit-profile-questionary')).toBeInTheDocument();
  });
});
