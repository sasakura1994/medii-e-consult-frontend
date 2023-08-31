import { renderHook, act, cleanup } from '@testing-library/react';
import { useDoctorNumberForm } from '../useDoctorNumberForm';
import { useUploadDocument } from '@/hooks/api/doctor/useUploadDocument';
import { useProfile } from '@/hooks/useProfile';

jest.mock('@/hooks/api/doctor/useUploadDocument');
jest.mock('@/hooks/useProfile');
beforeEach(() => {
  (useProfile as jest.Mock).mockReturnValue({
    profile: {
      commedical_speciality: 'Test Speciality',
      document_file_path: 'path/to/document',
      is_commedical: 1,
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
      confimation_type: 'number',
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
    uploadDocument: jest.fn(),
  });
});

afterEach(() => {
  cleanup();
});

describe('useDoctorNumberForm', () => {
  test('フォームが正常に動作するか', () => {
    const setSelectedWithRedirect = jest.fn();
    const { result } = renderHook(() => useDoctorNumberForm({ setSelectedWithRedirect }));

    act(() => {
      result.current.setDoctorNumber('123456');
      result.current.setDoctorLicenseMonth('11');
      result.current.setDoctorLicenseDay('12');
      result.current.eraConverter.setEra('year');
      result.current.setYear(2020);
    });

    expect(result.current.doctorNumber).toBe('123456');
    expect(result.current.doctorLicenseMonth).toBe('11');
    expect(result.current.doctorLicenseDay).toBe('12');
    expect(result.current.year).toBe(2020);

    act(() => {
      result.current.eraConverter.setEra('reiwa');
    });

    expect(result.current.year).toBe(2020);
  });

  test('エラー時にはsetSelectedにcompletedがセットされないこと', async () => {
    (useUploadDocument as jest.Mock).mockReturnValue({
      uploadDocument: jest.fn().mockReturnValue(Promise.reject({ response: { data: { message: 'error' } } })),
    });

    const setSelectedWithRedirect = jest.fn();
    const { result } = renderHook(() => useDoctorNumberForm({ setSelectedWithRedirect }));

    await act(async () => {
      await result.current.submit();
    });

    expect(result.current.errorMessage).toBe('error');
    expect(setSelectedWithRedirect).not.toHaveBeenCalledWith('completed');
  });

  test('正常にアップロードできた場合にsetSelectedにcompletedがセットされること', async () => {
    (useUploadDocument as jest.Mock).mockReturnValue({
      uploadDocument: jest.fn().mockResolvedValue({}),
    });

    const setSelectedWithRedirect = jest.fn();
    const { result } = renderHook(() => useDoctorNumberForm({ setSelectedWithRedirect }));

    await act(async () => {
      await result.current.submit();
    });

    expect(setSelectedWithRedirect).toHaveBeenCalledWith('completed');
  });
});
