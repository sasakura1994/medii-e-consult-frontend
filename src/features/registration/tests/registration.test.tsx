import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import RegistrationPage from '@/pages/registration';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('/registration', () => {
  test('通常時', async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });

    act(() => {
      render(<RegistrationPage />);
    });

    expect(screen.queryByTestId('nmo-registration-again-message-modal')).not.toBeInTheDocument();
  });

  test('nmoの再登録の場合は専用の注意書きが表示される', async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        from: 'nmo_registration_again',
      },
    });

    act(() => {
      render(<RegistrationPage />);
    });

    expect(screen.queryByTestId('nmo-registration-again-message-modal')).toBeInTheDocument();
  });
});
