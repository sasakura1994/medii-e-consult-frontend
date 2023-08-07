import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import WithdrawalPage from '@/pages/withdrawal';

jest.mock('@/hooks/api/doctor/useFetchProfile');
jest.mock('@/hooks/authentication/useAuthenticationOnPage');

describe('/withdrawal', () => {
  test('nmoの場合は専用の注意書きが表示される', async () => {
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

    waitFor(() => {
      expect(screen.queryByTestId('nmo-notice')).toBeInTheDocument();
    });
  });
});
