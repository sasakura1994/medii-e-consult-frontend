import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import WithdrawalPage from '@/pages/withdrawal';
import { useWithdrawalPage } from '@/features/mypages/editProfile/useWithdrawalPage';

jest.mock('@/hooks/api/doctor/useFetchProfile');
jest.mock('@/hooks/authentication/useAuthenticationOnPage');
jest.mock('@/features/mypages/editProfile/useWithdrawalPage');

describe('/withdrawal', () => {
  test('nmoの場合は専用の注意書きが表示される', async () => {
    (useWithdrawalPage as jest.Mock).mockReturnValue({
      questionaryItems: [],
    });

    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      profile: {
        registration_source: 'nmo',
      },
      isLoading: false,
    });

    await act(() => {
      render(
        <RecoilRoot>
          <WithdrawalPage />
        </RecoilRoot>
      );
    });

    expect(await act(async () => await waitFor(() => screen.queryByTestId('nmo-notice')))).toBeInTheDocument();
  });
});
