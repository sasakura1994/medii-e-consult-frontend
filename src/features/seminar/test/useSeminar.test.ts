import { renderHook, act, cleanup } from '@testing-library/react';
import { useSeminar } from '../useSeminar';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { useFetchUpcomingSeminar } from '@/hooks/api/seminar/useFetchUpcomingSeminar';
import { useSeminars } from '../useSeminars';

jest.mock('@/hooks/api/eventLog/useEventLog');
jest.mock('@/hooks/api/seminar/useFetchUpcomingSeminar');
jest.mock('../useSeminars');

const mockUseSeminarA = {
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
  seminar_reviews: null,
  seminar_start_time: '16:05:00',
  subject: 'テストセミナー2023 - 前半',
  zoom_url: 'zoom_url',
  created_at: '2023-06-03T13:07:15Z',
  updated_at: '2023-06-03T19:56:08Z',
};

const mockUseSeminarB = {
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
  seminar_reviews: null,
  seminar_start_time: '16:05:00',
  subject: 'テストセミナー2023 - 前半',
  zoom_url: 'zoom_url',
  created_at: '2023-06-03T13:07:15Z',
  updated_at: '2023-06-03T19:56:08Z',
};

beforeEach(() => {
  (useEventLog as jest.Mock).mockReturnValue({
    name: '/seminar',
  });
  (useFetchUpcomingSeminar as jest.Mock).mockReturnValue({
    seminars: [mockUseSeminarA, mockUseSeminarB],
  });
  (useSeminars as jest.Mock).mockReturnValue({
    seminars: [mockUseSeminarA],
    ticketCount: 1,
  });
});

afterEach(() => {
  cleanup();
});

describe('useSeminar hook', () => {
  test('hooksが正常に呼ばれるか', () => {
    renderHook(() => useSeminar());

    expect(useEventLog).toHaveBeenCalledWith({ name: '/seminar' });
    expect(useFetchUpcomingSeminar).toHaveBeenCalled();
    expect(useSeminars).toHaveBeenCalled();
  });

  test('モックデータが正常に返ってくるか', () => {
    const mockUpcomingSeminars = [mockUseSeminarA, mockUseSeminarB];
    const mockSeminars = [mockUseSeminarA];
    const { result } = renderHook(() => useSeminar());

    expect(result.current.upcomingSeminars).toStrictEqual(mockUpcomingSeminars);
    expect(result.current.seminars).toStrictEqual(mockSeminars);
    expect(result.current.ticketCount).toBe(1);
  });

  test('モーダルを開けるか', () => {
    const { result } = renderHook(() => useSeminar());
    expect(result.current.showModal).toBe(false);
    act(() => {
      result.current.setShowModal(true);
    });
    expect(result.current.showModal).toBe(true);
  });
});
