import React from 'react';

import { render, screen, act } from '@testing-library/react';
import * as useMedicalSpeciality from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { ConsultExampleListItem } from './ConsultExampleListItem';
import { ConsultExampleEntity } from '@/types/entities/ConsultExampleEntity';

jest.mock('@/hooks/medicalSpeciality/useMedicalSpeciality');

describe('ConsultExampleListItem', () => {
  beforeEach(() => {
    const useMedicalSpecialityMock = useMedicalSpeciality as jest.Mocked<
      typeof useMedicalSpeciality
    >;
    useMedicalSpecialityMock.useMedicalSpeciality.mockReturnValue({
      getMedicalSpecialityName: jest.fn(() => '内科'),
    } as unknown as ReturnType<typeof useMedicalSpecialityMock.useMedicalSpeciality>);
  });

  test('初回回答時間がある', async () => {
    const consultExample: ConsultExampleEntity = {
      uid: 0,
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
      is_published: 0,
      first_answer_minutes: 70,
      published_date: '',
      consultant_date: null,
      created_date: '',
      updated_date: '',
    };

    await act(() => {
      render(<ConsultExampleListItem consultExample={consultExample} />);
    });

    const firstAnswerMinutesText = screen.getByText('初回回答まで');
    expect(firstAnswerMinutesText).toBeInTheDocument();
  });

  test('初回回答時間がない', async () => {
    const consultExample: ConsultExampleEntity = {
      uid: 0,
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
      is_published: 0,
      first_answer_minutes: 0,
      published_date: '',
      consultant_date: null,
      created_date: '',
      updated_date: '',
    };

    await act(() => {
      render(<ConsultExampleListItem consultExample={consultExample} />);
    });

    const firstAnswerMinutesText = screen.queryByText('初回回答まで');
    expect(firstAnswerMinutesText).not.toBeInTheDocument();
  });

  test('グループではない場合', async () => {
    const consultExample: ConsultExampleEntity = {
      uid: 0,
      example_id: '',
      gender: 'man',
      title: '',
      category_name: '',
      speciality_code: 'not empty',
      age: null,
      background: '',
      disease_name: '',
      like_count: 0,
      comment_count: 0,
      all_like_count: 0,
      all_comment_count: 0,
      is_published: 0,
      first_answer_minutes: 0,
      published_date: '',
      consultant_date: null,
      created_date: '',
      updated_date: '',
    };

    await act(() => {
      render(<ConsultExampleListItem consultExample={consultExample} />);
    });

    const specialityText = screen.getByText('内科');
    expect(specialityText).toBeInTheDocument();
  });

  test('グループの場合', async () => {
    const consultExample: ConsultExampleEntity = {
      uid: 0,
      example_id: '',
      gender: 'man',
      title: '',
      category_name: 'グループ1',
      speciality_code: '',
      age: null,
      background: '',
      disease_name: '',
      like_count: 0,
      comment_count: 0,
      all_like_count: 0,
      all_comment_count: 0,
      is_published: 0,
      first_answer_minutes: 0,
      published_date: '',
      consultant_date: null,
      created_date: '',
      updated_date: '',
    };

    await act(() => {
      render(<ConsultExampleListItem consultExample={consultExample} />);
    });

    const groupText = screen.getByText('グループ1');
    expect(groupText).toBeInTheDocument();
    const specialityText = screen.queryByText('内科');
    expect(specialityText).not.toBeInTheDocument();
  });
});
