import React from 'react';
import { render, screen, act, waitFor, cleanup } from '@testing-library/react';
import { Document } from '../index';
import { useRouter } from 'next/router';
import { useProfile } from '@/hooks/useProfile';
import { useEventLog } from '@/hooks/api/eventLog/useEventLog';
import { useUploadDocument } from '@/hooks/api/doctor/useUploadDocument';
import { RecoilRoot } from 'recoil';
import userEvent from '@testing-library/user-event';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/useProfile', () => ({
  useProfile: jest.fn(),
}));

jest.mock('@/hooks/api/eventLog/useEventLog', () => ({
  useEventLog: jest.fn(),
}));

jest.mock('@/hooks/api/doctor/useUploadDocument', () => ({
  useUploadDocument: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};

beforeEach(() => {
  (useUploadDocument as jest.Mock).mockReturnValue({
    uploadDocument: jest.fn().mockImplementation(() => {
      return {
        status: 200,
        data: {
          status: 'complete',
        },
      };
    }),
  });
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
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
      main_speciality: '',
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
      hospital_id: null,
      hospital_name: 'Test Hospital',
      graduated_university: null,
      is_invited: false,
      is_skip_confirmation_by_utm_source: false,
      questionary_selected_ids_csv: null,
      questionary_other: null,
    },
    getPrefectureNameByCode: jest.fn(),
  });
  (useEventLog as jest.Mock).mockReturnValue({ postEventLog: jest.fn() });
});
const getRender = async () => {
  act(() => {
    render(
      <RecoilRoot>
        <Document />
      </RecoilRoot>
    );
  });
};
afterEach(() => {
  cleanup();
});

describe('Document', () => {
  test('Documentがレンダリングされること', async () => {
    await getRender();
    act(() => {
      const document = screen.getByText('Medii 会員登録');
      expect(document).toBeInTheDocument();
    });
  });

  test('is_invitedがtrueの場合、/welcomeに遷移すること', async () => {
    (useProfile as jest.Mock).mockReturnValue({
      profile: { is_invited: true },
    });
    await getRender();
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/welcome');
    });
  });

  test('is_skip_confirmation_by_utm_sourceがtrueの場合、/welcomeに遷移すること', async () => {
    (useProfile as jest.Mock).mockReturnValue({
      profile: { is_invited: true },
    });
    await getRender();
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/welcome');
    });
  });

  test('selectedがdocumentの場合、DocumentInputDocumentがレンダリングされること', async () => {
    await getRender();
    act(() => {
      const document = screen.getByTestId('document');
      expect(document).toBeInTheDocument();
      userEvent.click(document);
    });
    await waitFor(() => {
      expect(screen.getByTestId('document-input-document')).toBeInTheDocument();
    });
  });

  test('selectedがnumberの場合、DocumentInputNumberがレンダリングされること', async () => {
    await getRender();
    act(() => {
      const numberDocument = screen.getByTestId('number');
      expect(numberDocument).toBeInTheDocument();
      userEvent.click(numberDocument);
    });
    await waitFor(() => {
      expect(screen.getByTestId('document-input-number')).toBeInTheDocument();
    });
  });

  test('selectedがautoの場合、DocumentInputAutoがレンダリングされること', async () => {
    await getRender();
    act(() => {
      const auto = screen.getByTestId('auto');
      expect(auto).toBeInTheDocument();
      userEvent.click(auto);
    });
    await waitFor(() => {
      expect(screen.getByTestId('document-input-auto')).toBeInTheDocument();
    });
  });

  test('STUDENTの場合、DocumentInputStudentがレンダリングされること', async () => {
    (useProfile as jest.Mock).mockReturnValue({
      profile: {
        main_speciality: 'STUDENT',
      },
    });
    await getRender();

    expect(
      screen.getByTestId('document-input-student-document')
    ).toBeInTheDocument();
  });

  test('selectedがconmpeteの場合、welcomeページへ遷移すること', async () => {
    await getRender();
    await act(async () => {
      const number = screen.getByTestId('number');
      expect(number).toBeInTheDocument();
      userEvent.click(number);
    });
    await waitFor(() => {
      expect(screen.getByTestId('document-input-number')).toBeInTheDocument();
    });

    await act(async () => {
      const doctorNumber = screen.getByTestId('document-input-number-form');
      userEvent.clear(doctorNumber);
      userEvent.type(doctorNumber, '111111');

      const year = screen.getByTestId('year-input-year');
      userEvent.clear(year);
      userEvent.type(year, '2015');

      const month = screen.getByTestId('document-input-number-form-month');
      userEvent.clear(month);
      userEvent.type(month, '6');

      const day = screen.getByTestId('document-input-number-form-day');
      userEvent.clear(day);
      userEvent.type(day, '20');

      const submit = screen.getByTestId('document-input-number-form-submit');
      userEvent.click(submit);
    });
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/welcome');
    });
  });
});
