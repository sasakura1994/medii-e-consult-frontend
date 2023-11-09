import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';

import { NotifySettings } from '../NotifySettings';
import * as useFetchProfileModule from '@/hooks/api/doctor/useFetchProfile';
import { ProfileEntity } from '@/types/entities/profileEntity';

jest.mock('@/hooks/api/doctor/useFetchProfile');

describe('NotifySettings', () => {
  test('ラジオボタンが選択できること', async () => {
    const useFetchProfileMock = useFetchProfileModule as jest.Mocked<typeof useFetchProfileModule>;
    useFetchProfileMock.useFetchProfile.mockReturnValue({
      profile: {
        is_mail_notify: false,
        is_push_notify: false,
        not_seminar_mail_target: false,
      } as ProfileEntity,
      isLoading: false,
    });

    await act(() => {
      render(<NotifySettings />);
    });

    const radios = screen.getAllByRole('radio') as HTMLInputElement[];

    await act(() => userEvent.click(radios[0]));
    expect(radios[0]).toBeChecked();

    await act(() => userEvent.click(radios[1]));
    expect(radios[1]).toBeChecked();

    await act(() => userEvent.click(radios[2]));
    expect(radios[2]).toBeChecked();

    await act(() => userEvent.click(radios[3]));
    expect(radios[3]).toBeChecked();

    await act(() => userEvent.click(radios[4]));
    expect(radios[4]).toBeChecked();
  });
});
