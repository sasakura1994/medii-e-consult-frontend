import React from 'react';
import { render, screen } from '@testing-library/react';
import * as useMedicalSpeciality from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { ConsultExampleDetailMessage } from './ConsultExampleDetailMessage';
import { ConsultExampleMessageEntity } from '@/types/entities/ConsultExampleMessageEntity';

jest.mock('@/hooks/medicalSpeciality/useMedicalSpeciality');

const baseConsultExampleMessage: ConsultExampleMessageEntity = {
  uid: 0,
  account_type: 'doctor',
  doctor_name: '',
  message: '',
  file_id: '',
  file_name: '',
  file_path: '',
  content_type: '',
  like_count: 0,
  comment_count: 0,
  deleted: 0,
  created_date: '',
  is_liked: false,
};

describe('ConsultExampleDetailMessage', () => {
  beforeEach(() => {
    const useMedicalSpecialityMock = useMedicalSpeciality as jest.Mocked<typeof useMedicalSpeciality>;
    useMedicalSpecialityMock.useMedicalSpeciality.mockReturnValue({
      getMedicalSpecialityName: jest.fn(() => '内科'),
    } as unknown as ReturnType<typeof useMedicalSpecialityMock.useMedicalSpeciality>);
  });

  test('主治医', async () => {
    const consultExampleMessage: ConsultExampleMessageEntity = {
      ...baseConsultExampleMessage,
    };

    await render(<ConsultExampleDetailMessage consultExampleMessage={consultExampleMessage} />);

    const accountTypeText = screen.getByText('主治医');
    expect(accountTypeText).toBeInTheDocument();
    const message = screen.getByTestId('message');
    message.classList.contains('bg-primary-light');
  });

  test('専門医', async () => {
    const consultExampleMessage: ConsultExampleMessageEntity = {
      ...baseConsultExampleMessage,
      account_type: 'consultant',
    };

    await render(<ConsultExampleDetailMessage consultExampleMessage={consultExampleMessage} />);

    const accountTypeText = screen.getByText('専門医');
    expect(accountTypeText).toBeInTheDocument();
    const message = screen.getByTestId('message');
    message.classList.contains('bg-bg');
  });

  test('医師名指定', async () => {
    const consultExampleMessage: ConsultExampleMessageEntity = {
      ...baseConsultExampleMessage,
      account_type: 'consultant',
      doctor_name: '医師山',
    };

    await render(<ConsultExampleDetailMessage consultExampleMessage={consultExampleMessage} />);

    const accountTypeText = screen.getByText('医師山');
    expect(accountTypeText).toBeInTheDocument();
    const message = screen.getByTestId('message');
    message.classList.contains('bg-bg');
  });
});
