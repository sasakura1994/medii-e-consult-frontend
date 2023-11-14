import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { Seminar } from '../index';
import { useSeminar } from '../useSeminar';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import { ticketCountEntity } from '@/types/entities/ticketCountEntity';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';

jest.mock('../useSeminar');
jest.mock('@/hooks/api/doctor/useFetchProfile');

const seminarData: SeminarEntityType[] = [
  {
    uid: 19,
    account_id: 'AC10-1105-0802-17',
    description: 'セミナーの概要がここに入る',
    doctor_name: 'テスト医師',
    doctor_profile: 'なし',
    image_url: 'image_url',
    is_consult_available: false,
    movie_url: '',
    seminar_date: '2023-06-09T00:00:00',
    seminar_end_time: '18:06:00',
    seminar_id: '7d6f9a01-7119-4c06-b6d6-50b17922de11',
    seminar_reviews: [
      {
        id: 1,
        seminar_id: 's',
        body: '',
        display_order: 1,
        created_at: 'string',
        updated_at: 'string',
      },
    ],
    seminar_start_time: '16:05:00',
    subject: 'テストセミナー2023 - 前半',
    zoom_url: 'zoom_url',
    created_at: '2023-06-03T13:07:15Z',
    updated_at: '2023-06-03T19:56:08Z',
  },
  {
    uid: 20,
    account_id: 'AC10-1105-0802-17',
    description: 'セミナーの概要がここに入る',
    doctor_name: 'テスト医師',
    doctor_profile: 'なし',
    image_url: 'image_url',
    is_consult_available: false,
    movie_url: '',
    seminar_date: '2023-06-09T00:00:00',
    seminar_end_time: '18:06:00',
    seminar_id: '7d6f9a01-7119-4c06-b6d6-50b17922de12',
    seminar_reviews: [
      {
        id: 1,
        seminar_id: 's',
        body: '',
        display_order: 1,
        created_at: 'string',
        updated_at: 'string',
      },
    ],
    seminar_start_time: '16:05:00',
    subject: 'テストセミナー2023 - 前半',
    zoom_url: 'zoom_url',
    created_at: '2023-06-03T13:07:15Z',
    updated_at: '2023-06-03T19:56:08Z',
  },
];

const ticketCountData: ticketCountEntity = {
  ticket_count: 2,
};

beforeEach(() => {
  (useSeminar as jest.Mock).mockReturnValue({
    seminars: seminarData,
    upcomingSeminars: seminarData,
    ticketCount: ticketCountData,
    showModal: false,
    setShowModal: jest.fn(),
  });
  (useFetchProfile as jest.Mock).mockReturnValue({
    profile: {
      is_imperfect_profile: true,
      main_speciality: 'naika',
      need_to_send_confimation: true,
    } as ProfileEntity,
  });
});
// const getRender = async () => {
//   render(
//       <Seminar />
//   );
// };

afterEach(() => {
  cleanup();
});

describe('Seminar component', () => {
  test('初期表示テスト', async () => {
    await act(() => {
      render(<Seminar />);
    });

    const text = await act(async () => {
      return await waitFor(() => screen.getByText('最新のE-カンファ'));
    });
    expect(text).toBeInTheDocument();
  });

  test('プロフィール情報が入力されておりません。が表示されるか', async () => {
    (useFetchProfile as jest.Mock).mockReturnValue({
      profile: {
        status: 'CREATED',
        main_speciality: 'naika',
      } as ProfileEntity,
    });

    await act(() => {
      render(<Seminar />);
    });

    const text = await act(async () => {
      return await waitFor(() => screen.getByText(/プロフィール情報が入力されておりません。/));
    });
    expect(text).toBeInTheDocument();
  });

  test('確認資料が提出されておりません。が表示されるか', async () => {
    (useFetchProfile as jest.Mock).mockReturnValue({
      profile: {
        main_speciality: 'naika',
        status: 'PROFILE',
      } as ProfileEntity,
    });

    await act(() => {
      render(<Seminar />);
    });

    const text = await act(async () => {
      return await waitFor(() => screen.getByText(/確認資料が提出されておりません。/));
    });
    expect(text).toBeInTheDocument();
  });

  test('モーダルが表示されないか', async () => {
    (useFetchProfile as jest.Mock).mockReturnValue({
      profile: {
        main_speciality: 'naika',
        status: 'VERIFIED',
      } as ProfileEntity,
    });

    await act(() => {
      render(<Seminar />);
    });

    expect(
      await act(async () => {
        return await waitFor(() => screen.queryByText(/プロフィール情報が入力されておりません。/));
      })
    ).not.toBeInTheDocument();
    expect(
      await act(async () => {
        return await waitFor(() => screen.queryByText(/確認資料が提出されておりません。/));
      })
    ).not.toBeInTheDocument();
    expect(
      await act(async () => {
        return await waitFor(() => screen.queryByText(/現在、ご提出頂いた資料を確認中です。/));
      })
    ).not.toBeInTheDocument();
    expect(
      await act(async () => {
        return await waitFor(() => screen.getByText('最新のE-カンファ'));
      })
    ).toBeInTheDocument();
  });

  test('ボタン押下でモーダルが閉じるかテスト', async () => {
    const setShowModalMock = jest.fn();
    (useSeminar as jest.Mock).mockReturnValue({
      seminars: seminarData,
      upcomingSeminars: seminarData,
      ticketCount: ticketCountData,
      showModal: true,
      setShowModal: setShowModalMock,
    });

    await act(() => {
      render(<Seminar />);
    });

    await act(() => {
      userEvent.click(screen.getByTestId('close-modal'));
    });

    await waitFor(() => {
      expect(setShowModalMock).toHaveBeenCalledWith(false);
    });
  });
});
