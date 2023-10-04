import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, act, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { EditProfile } from '../EditProfile';

jest.mock('@/hooks/api/doctor/useFetchProfile');

describe('EditProfile', () => {
  test('nmoの場合は利用区分を表示しない', async () => {
    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      profile: {
        birthday_year: 2000,
        birthday_month: 4,
        birthday_day: 1,
        qualified_year: 2020,
        registration_source: 'nmo',
      },
    });

    await act(() => {
      render(
        <RecoilRoot>
          <EditProfile isRegisterMode={false} />
        </RecoilRoot>
      );
    });

    const editProfileUsageClassification = await act(
      async () => await waitFor(() => screen.queryByTestId('edit-profile-usage-classification'))
    );
    expect(editProfileUsageClassification).not.toBeInTheDocument();
  });
});
