import React from 'react';

import { render, screen } from '@testing-library/react';
import * as useMedicalSpeciality from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { ConsultExampleDetail } from './ConsultExampleDetail';
import { ConsultExampleDetailEntity } from '@/types/entities/ConsultExampleDetailEntity';

jest.mock('@/hooks/medicalSpeciality/useMedicalSpeciality');

const baseConsultExample: ConsultExampleDetailEntity = {
  example_id: '',
  gender: 'man',
  title: '',
  category_name: '',
  speciality_code: '',
  age: null,
  background: '',
  disease_name: '',
  like_count: 0,
  comment_count: 0,
  all_like_count: 0,
  all_comment_count: 0,
  first_answer_minutes: 70,
  published_date: '',
  consultant_date: null,
  created_date: '',
  is_liked: false,
};

describe('ConsultExampleDetail', () => {
  beforeEach(() => {
    const useMedicalSpecialityMock = useMedicalSpeciality as jest.Mocked<
      typeof useMedicalSpeciality
    >;
    useMedicalSpecialityMock.useMedicalSpeciality.mockReturnValue({
      getMedicalSpecialityName: jest.fn(() => '内科'),
    } as unknown as ReturnType<typeof useMedicalSpecialityMock.useMedicalSpeciality>);
  });

  test('初回回答時間がある', async () => {
    const consultExample: ConsultExampleDetailEntity = {
      ...baseConsultExample,
    };

    await render(
      <ConsultExampleDetail
        consultExample={consultExample}
        consultExampleMessages={[]}
      />
    );

    const firstAnswerMinutesText = screen.getByText('初回回答まで');
    expect(firstAnswerMinutesText).toBeInTheDocument();
  });

  test('初回回答時間がない', async () => {
    const consultExample: ConsultExampleDetailEntity = {
      ...baseConsultExample,
      first_answer_minutes: 0,
    };

    await render(
      <ConsultExampleDetail
        consultExample={consultExample}
        consultExampleMessages={[]}
      />
    );

    const firstAnswerMinutesText = screen.queryByText('初回回答まで');
    expect(firstAnswerMinutesText).not.toBeInTheDocument();
  });

  test('グループではない場合', async () => {
    const consultExample: ConsultExampleDetailEntity = {
      ...baseConsultExample,
      speciality_code: 'not empty',
    };

    await render(
      <ConsultExampleDetail
        consultExample={consultExample}
        consultExampleMessages={[]}
      />
    );

    const specialityText = screen.getByText('内科');
    expect(specialityText).toBeInTheDocument();
  });

  test('グループの場合', async () => {
    const consultExample: ConsultExampleDetailEntity = {
      ...baseConsultExample,
      category_name: 'グループ1',
    };

    await render(
      <ConsultExampleDetail
        consultExample={consultExample}
        consultExampleMessages={[]}
      />
    );

    const groupText = screen.getByText('グループ1');
    expect(groupText).toBeInTheDocument();
    const specialityText = screen.queryByText('内科');
    expect(specialityText).not.toBeInTheDocument();
  });

  test('いいねされている', async () => {
    const consultExample: ConsultExampleDetailEntity = {
      ...baseConsultExample,
      is_liked: true,
    };

    const { getByAltText } = await render(
      <ConsultExampleDetail
        consultExample={consultExample}
        consultExampleMessages={[]}
      />
    );

    const likedButtonIcon = getByAltText('いいね済み');
    expect(likedButtonIcon).toBeInTheDocument();
  });

  test('メッセージがいいねされている', async () => {
    const consultExample: ConsultExampleDetailEntity = {
      ...baseConsultExample,
    };

    const { getByAltText } = await render(
      <ConsultExampleDetail
        consultExample={consultExample}
        consultExampleMessages={[
          {
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
            is_liked: true,
          },
        ]}
      />
    );

    const likedButtonIcon = getByAltText('いいね済み');
    expect(likedButtonIcon).toBeInTheDocument();
  });
});
