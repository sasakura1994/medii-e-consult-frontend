import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import PasswordResetRequestPage from '@/pages/PasswordResetRequest';
import { PostRequestResetPasswordResponseData } from '@/hooks/api/account/usePostRequestResetPassword';
import * as apiClient from '@/libs/apiClient';
import { AxiosInstance } from 'axios';

jest.mock('@/libs/apiClient');

describe('PasswordResetRequest', () => {
  test('結果を表示する', async () => {
    const apiClientMock = apiClient as jest.Mocked<typeof apiClient>;
    apiClientMock.createApiClient.mockReturnValue({
      post: jest.fn(() => Promise.resolve({ data })),
    } as unknown as AxiosInstance);
    const data: PostRequestResetPasswordResponseData = { code: 1, message: '' };

    await act(() => {
      render(
        <RecoilRoot>
          <PasswordResetRequestPage />
        </RecoilRoot>
      );
    });

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'dummy@example.com' },
    });

    await act(() => {
      userEvent.click(screen.getByRole('button'));
    });

    const headingEditProfileEdit = screen.getByTestId('result-text');
    expect(headingEditProfileEdit).toBeInTheDocument();
  });
});