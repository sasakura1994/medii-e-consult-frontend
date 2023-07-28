import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import NewChatRoomPage from '@/pages/newchatroom';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';

jest.mock('@/hooks/api/doctor/useFetchProfile');

describe('/newchatroom', () => {
  test('nmoユーザー且つプロフィール未入力の場合はモーダル表示', async () => {
    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      profile: {
        registration_source: 'nmo',
        last_name_hira: '',
      },
    });

    await act(() => {
      render(
        <RecoilRoot>
          <NewChatRoomPage />
        </RecoilRoot>
      );
    });

    waitFor(() => {
      expect(screen.queryByTestId('nmo-modal')).toBeInTheDocument();
    });
  });
});
