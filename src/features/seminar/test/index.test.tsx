import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Seminar } from '../index';
import { useSeminar } from '../useSeminar';
import { ProfileEntity } from '@/types/entities/profileEntity';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import { ticketCountEntity } from '@/types/entities/ticketCountEntity';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

jest.mock('../useSeminar');

describe('Seminar component', () => {
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
      seminar_id: '7d6f9a01-7119-4c06-b6d6-50b17922de16',
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
      seminar_id: '7d6f9a01-7119-4c06-b6d6-50b17922de16',
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

  const profileData: ProfileEntity = {
    commedical_speciality: 'Cardiology',
    document_file_path: '/path/to/document',
    is_commedical: 1,
    document: null,
    last_name: 'Tanaka',
    first_name: 'Taro',
    last_name_hira: 'たなか',
    first_name_hira: 'たろう',
    birthday_year: 1980,
    birthday_month: 7,
    birthday_day: 15,
    main_speciality: 'Cardiology',
    speciality_2: 'Endocrinology',
    speciality_3: 'Immunology',
    speciality_4: 'Nephrology',
    medical_specialities: [
      'Cardiology',
      'Endocrinology',
      'Immunology',
      'Nephrology',
    ],
    qualification: 'MD',
    expertise: 'Cardiology',
    confimation_type: 'Certificate',
    qualified_year: 2005,
    doctor_qualified_year: 2007,
    doctor_qualified_month: 3,
    doctor_qualified_day: 27,
    doctor_number: '123456',
    tel: '123-456-7890',
    status: 'VERIFIED',
    need_to_send_confimation: false,
    is_imperfect_profile: false,
    is_hospital_doctor: true,
    is_mail_notify: true,
    is_push_notify: false,
    not_seminar_mail_target: false,
    want_to_be_consultant: true,
    assignable: 1,
    graduation_year: '2003',
    use_prefecture: 'Tokyo',
    prefecture_code: '13',
    hospital_id: '1001',
    hospital_name: 'Tokyo General Hospital',
    graduated_university: 'Tokyo Medical University',
    is_invited: false,
    is_skip_confirmation_by_utm_source: false,
    questionary_selected_ids_csv: '1,2,3',
    questionary_other: 'No other details',
  };

  beforeEach(() => {
    (useSeminar as jest.Mock).mockReturnValue({
      seminars: seminarData,
      upcomingSeminars: seminarData,
      ticketCount: ticketCountData,
      profile: profileData,
      showModal: false,
      setShowModal: jest.fn(),
    });
  });

  test('初期表示テスト', () => {
    render(<Seminar />);
    expect(screen.getByText('最新のセミナー')).toBeInTheDocument();
  });

  test('「プロフィール情報が入力されておりません」が表示されるかテスト', async () => {
    const profileDataForTest = {
      ...profileData,
      is_imperfect_profile: true,
    };
    (useSeminar as jest.Mock).mockReturnValue({
      seminars: seminarData,
      upcomingSeminars: seminarData,
      ticketCount: ticketCountData,
      profile: profileDataForTest,
      showModal: false,
      setShowModal: jest.fn(),
    });

    render(<Seminar />);
    await waitFor(() => {
      const elements = screen.getByTestId('is-not-enter-profile-modal');
      expect(elements).toBeInTheDocument();
    });
  });

  test('「確認資料が提出されておりません。」が表示されるかテスト', async () => {
    const profileDataForTest = {
      ...profileData,
      need_to_send_confimation: true,
    };
    (useSeminar as jest.Mock).mockReturnValue({
      seminars: seminarData,
      upcomingSeminars: seminarData,
      ticketCount: ticketCountData,
      profile: profileDataForTest,
      showModal: false,
      setShowModal: jest.fn(),
    });

    render(<Seminar />);
    await waitFor(() => {
      const element = screen.getByTestId('need-to-send-confimation-modal');
      expect(element).toBeInTheDocument();
    });
  });

  test('「現在、ご提出頂いた資料を確認中です。」が表示されるかテスト', async () => {
    const profileDataForTest = { ...profileData, status: 'CREATED' };
    (useSeminar as jest.Mock).mockReturnValue({
      seminars: seminarData,
      upcomingSeminars: seminarData,
      ticketCount: ticketCountData,
      profile: profileDataForTest,
      showModal: false,
      setShowModal: jest.fn(),
    });

    render(<Seminar />);
    await waitFor(() => {
      const element = screen.getByTestId('not-verified-modal');
      expect(element).toBeInTheDocument();
    });
  });

  test('ボタン押下でモーダルが閉じるかテスト', async () => {
    const setShowModalMock = jest.fn();
    (useSeminar as jest.Mock).mockReturnValue({
      seminars: seminarData,
      upcomingSeminars: seminarData,
      ticketCount: ticketCountData,
      profile: profileData,
      showModal: true,
      setShowModal: setShowModalMock,
    });

    render(<Seminar />);
    act(() => {
      userEvent.click(screen.getByTestId('close-modal'));
    });
    await waitFor(() => {
      expect(setShowModalMock).toHaveBeenCalledWith(false);
    });
  });
});
