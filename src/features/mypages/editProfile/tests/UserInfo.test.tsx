import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { UserInfo } from '../UserInfo';
import { EditingProfile, UseEditProfile } from '../useEditProfile';
import { EditProfileProps } from '../EditProfile';

jest.mock('next/router');
jest.mock('@/hooks/api/doctor/useFetchProfile');

describe('UserInfo', () => {
  const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
  (useRouterMock as jest.Mock).mockReturnValue({
    query: {},
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

  test('編集時は入力欄がdisabled', async () => {
    act(() => {
      const props = {
        isRegisterMode: false,
        profile: {} as EditingProfile,
        setProfileFields: jest.fn(),
      } as unknown as UseEditProfile & EditProfileProps;
      render(
        <RecoilRoot>
          <UserInfo {...props} />
        </RecoilRoot>
      );
    });

    expect(screen.getByTestId('last_name')).toBeDisabled();
    expect(screen.getByTestId('first_name')).toBeDisabled();
    expect(screen.getByTestId('last_name_hira')).toBeDisabled();
    expect(screen.getByTestId('first_name_hira')).toBeDisabled();
    expect(screen.getByTestId('birthday_year')).toBeDisabled();
    expect(screen.getByTestId('birthday_month')).toBeDisabled();
    expect(screen.getByTestId('birthday_day')).toBeDisabled();
    expect(screen.getByTestId('graduated_university')).toBeDisabled();
  });

  test('新規登録時は入力欄が有効', async () => {
    act(() => {
      const props = {
        isRegisterMode: true,
        profile: {} as EditingProfile,
        setProfileFields: jest.fn(),
      } as unknown as UseEditProfile & EditProfileProps;
      render(
        <RecoilRoot>
          <UserInfo {...props} />
        </RecoilRoot>
      );
    });

    expect(screen.getByTestId('last_name')).toBeEnabled();
    expect(screen.getByTestId('first_name')).toBeEnabled();
    expect(screen.getByTestId('last_name_hira')).toBeEnabled();
    expect(screen.getByTestId('first_name_hira')).toBeEnabled();
    expect(screen.getByTestId('year-input-year')).toBeEnabled();
    expect(screen.getByTestId('birthday_month')).toBeEnabled();
    expect(screen.getByTestId('birthday_day')).toBeEnabled();
    expect(screen.getByTestId('graduated_university')).toBeEnabled();
  });
});
