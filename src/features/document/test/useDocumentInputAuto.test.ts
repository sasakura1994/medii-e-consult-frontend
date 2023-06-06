import { renderHook, act } from '@testing-library/react';
import { useDocumentInputAuto } from '../useDocumentInputAuto';
import { useUploadDocument } from '@/hooks/api/doctor/useUploadDocument';
import { useProfile } from '@/hooks/useProfile';

jest.mock('@/hooks/api/doctor/useUploadDocument');
jest.mock('@/hooks/useProfile');

describe('useDocumentInputAuto', () => {
  beforeEach(() => {
    (useUploadDocument as jest.Mock).mockReturnValue({
      uploadDocument: jest.fn(),
    });

    (useProfile as jest.Mock).mockReturnValue({
      profile: {
        doctor_qualified_year: 2000,
        tel: '1234567890',
      },
      getPrefectureNameByCode: jest.fn(),
      hospital: {},
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('インプットが正しくできること', () => {
    const setSelected = jest.fn();
    const { result } = renderHook(() => useDocumentInputAuto({ setSelected }));

    act(() => {
      result.current.setTel('0987654321');
      result.current.handleInputYearToSeireki('2023');
    });

    expect(result.current.tel).toBe('0987654321');
    expect(result.current.inputYear).toBe('2023');
  });

  test('エラー時にはsetSelectedにcompletedがセットされないこと', async () => {
    (useUploadDocument as jest.Mock).mockReturnValue({
      uploadDocument: jest.fn().mockRejectedValue({ message: 'error' }),
    });

    const setSelected = jest.fn();
    const { result } = renderHook(() => useDocumentInputAuto({ setSelected }));

    await act(async () => {
      await result.current.submit();
    });

    expect(result.current.errorMessage).toBe('error');
    expect(setSelected).not.toHaveBeenCalledWith('completed');
  });

  test('正常にフォーム送信できた場合にsetSelectedにcompletedがセットされること', async () => {
    (useUploadDocument as jest.Mock).mockReturnValue({
      uploadDocument: jest.fn().mockResolvedValue({}),
    });

    const setSelected = jest.fn();
    const { result } = renderHook(() => useDocumentInputAuto({ setSelected }));

    await act(async () => {
      await result.current.submit();
    });

    expect(setSelected).toHaveBeenCalledWith('completed');
  });
});
