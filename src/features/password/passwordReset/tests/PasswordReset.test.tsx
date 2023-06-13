import React from 'react';

import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import * as apiClient from '@/libs/apiClient';
import { AxiosInstance } from 'axios';
import { PostResetPasswordResponseData } from '@/hooks/api/account/usePostPasswordReset';
import PasswordResetPage from '@/pages/passwordreset';

jest.mock('@/libs/apiClient');
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    query: { token: 'test' },
  })),
}));

describe('PasswordReset', () => {
  test('結果を表示する', async () => {
    const apiClientMock = apiClient as jest.Mocked<typeof apiClient>;
    apiClientMock.createApiClient.mockReturnValue({
      post: jest.fn(() => Promise.resolve({ data: data, status: 204 })),
    } as unknown as AxiosInstance);
    const data: PostResetPasswordResponseData = { code: 1, message: '' };

    await act(() => {
      render(
        <RecoilRoot>
          <PasswordResetPage />
        </RecoilRoot>
      );
    });

    await act(() => {
      userEvent.type(screen.getByLabelText('first_password'), '11111111');
      userEvent.type(screen.getByLabelText('second_password'), '11111111');
    });

    await act(() => {
      userEvent.click(screen.getByRole('button'));
    });

    const headingEditProfileEdit = screen.getByTestId('result-text');
    expect(headingEditProfileEdit).toBeInTheDocument();
  });
});
