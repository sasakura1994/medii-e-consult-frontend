import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import NewChatRoomPage from '@/pages/newchatroom';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useRouter } from 'next/router';

jest.mock('next/router');
jest.mock('@/hooks/api/doctor/useFetchProfile');

describe('/newchatroom', () => {
  test('nmoユーザー且つプロフィール未入力の場合はモーダル表示', async () => {
    const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
    (useRouterMock as jest.Mock).mockReturnValue({
      query: {},
    });

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
