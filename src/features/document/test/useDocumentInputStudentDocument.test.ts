import { renderHook, act, cleanup } from '@testing-library/react';
import { useDocumentInputStudentDocument } from '../useDocumentInputStudentDocument';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import { useUploadDocument } from '@/hooks/api/doctor/useUploadDocument';
import { useSelectedFile } from '../useSelectedFile';

jest.mock('@/hooks/api/doctor/useFetchProfile');
jest.mock('@/hooks/api/doctor/useUploadDocument');
jest.mock('../useSelectedFile');

describe('useDocumentInputStudentDocument', () => {
  beforeEach(() => {
    (useFetchProfile as jest.Mock).mockReturnValue({
      profile: {
        document_file_path: 'path/to/document',
        document: null,
        last_name: 'Doe',
        first_name: 'John',
        last_name_hira: 'ドウ',
        first_name_hira: 'ジョン',
        birthday_year: 1990,
        birthday_month: 6,
        birthday_day: 15,
        main_speciality: 'Neurology',
        speciality_2: 'Cardiology',
        speciality_3: '',
        speciality_4: '',
        medical_specialities: ['Neurology', 'Cardiology'],
        qualification: 'MD',
        expertise: 'Neuroscience',
        confimation_type: 'document',
        qualified_year: 2015,
        doctor_qualified_year: 2015,
        doctor_qualified_month: 6,
        doctor_qualified_day: 20,
        doctor_number: '123456',
        tel: '123-456-7890',
        status: 'active',
        need_to_send_confimation: false,
        is_imperfect_profile: false,
        is_hospital_doctor: true,
        is_mail_notify: true,
        is_push_notify: true,
        not_seminar_mail_target: false,
        want_to_be_consultant: false,
        assignable: 1,
        graduation_year: 2010,
        use_prefecture: null,
        prefecture_code: '13',
        hospital_id: 'hospital1',
        hospital_name: 'Test Hospital',
        graduated_university: null,
        is_invited: false,
        is_skip_confirmation_by_utm_source: false,
        questionary_selected_ids_csv: null,
        questionary_other: null,
      },
    });
    (useUploadDocument as jest.Mock).mockReturnValue({
      uploadDocument: jest.fn().mockResolvedValue({ data: {} }),
    });
    (useSelectedFile as jest.Mock).mockReturnValue({
      imageSource: 'test',
      onFileSelected: jest.fn(),
      setImageSource: jest.fn(),
      openFileSelector: jest.fn(),
      fileSelectorRef: { current: { files: ['test'] } },
    });
  });

  afterEach(() => {
    cleanup();
  });

  test('ロード時に正しい値がsetImageSourceにセットされていること', () => {
    const { setImageSource } = renderHook(() => useSelectedFile()).result.current;
    renderHook(() =>
      useDocumentInputStudentDocument({
        selected: '',
        setSelected: jest.fn(),
      })
    );
    expect(setImageSource).toHaveBeenCalledWith('path/to/document');
  });

  test('インプットが正しくできること', async () => {
    const { result } = renderHook(() =>
      useDocumentInputStudentDocument({
        selected: '',
        setSelected: jest.fn(),
      })
    );
    act(() => {
      result.current.setYear(2023);
    });
    expect(result.current.year).toBe(2023);

    act(() => {
      result.current.eraConverter.setEra('reiwa');
    });
    expect(result.current.year).toBe(2023);
  });

  test('submit時にsetSelectedで"studentCompleted"になること', async () => {
    const setSelected = jest.fn();
    const { submit } = renderHook(() =>
      useDocumentInputStudentDocument({
        selected: '',
        setSelected,
      })
    ).result.current;

    await act(async () => {
      const event = {
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent;
      submit(event);
    });

    expect(setSelected).toHaveBeenCalledWith('studentCompleted');
  });

  test('uploadDocumentに失敗した場合にはsetSelectedが呼び出されないこと', async () => {
    const setSelected = jest.fn();
    (useUploadDocument as jest.Mock).mockReturnValue({
      uploadDocument: jest.fn().mockReturnValue(Promise.reject({ response: { data: { message: 'error' } } })),
    });

    const { submit } = renderHook(() =>
      useDocumentInputStudentDocument({
        selected: '',
        setSelected,
      })
    ).result.current;

    await act(async () => {
      const event = {
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent;
      submit(event);
    });

    expect(setSelected).not.toHaveBeenCalledWith('studentCompleted');
  });
});
