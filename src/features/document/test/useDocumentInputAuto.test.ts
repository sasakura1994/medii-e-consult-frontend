import { renderHook, act, cleanup } from '@testing-library/react';
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
    cleanup();
  });

  test('エラー時にはsetSelectedにcompletedがセットされないこと', async () => {
    (useUploadDocument as jest.Mock).mockReturnValue({
      uploadDocument: jest.fn().mockReturnValue(Promise.reject({ response: { data: { message: 'error' } } })),
    });

    const setSelectedWithRedirect = jest.fn();
    const { result } = renderHook(() => useDocumentInputAuto({ setSelectedWithRedirect }));

    await act(async () => {
      await result.current.submit();
    });

    expect(result.current.errorMessage).toBe('error');
    expect(setSelectedWithRedirect).not.toHaveBeenCalledWith('completed');
  });

  test('正常にフォーム送信できた場合にsetSelectedにcompletedがセットされること', async () => {
    (useUploadDocument as jest.Mock).mockReturnValue({
      uploadDocument: jest.fn().mockResolvedValue({}),
    });

    const setSelectedWithRedirect = jest.fn();
    const { result } = renderHook(() => useDocumentInputAuto({ setSelectedWithRedirect }));

    await act(async () => {
      await result.current.submit();
    });

    expect(setSelectedWithRedirect).toHaveBeenCalledWith('completed');
  });
});
