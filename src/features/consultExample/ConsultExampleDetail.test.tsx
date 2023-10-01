import React from 'react';

import { act, render, screen, waitFor } from '@testing-library/react';
import * as useMedicalSpeciality from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { ConsultExampleDetail } from './ConsultExampleDetail';
import { ConsultExampleDetailEntity } from '@/types/entities/ConsultExampleDetailEntity';
import { RecoilRoot } from 'recoil';

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
  showConsultQuestionFlag: false,
};

describe('ConsultExampleDetail', () => {
  beforeEach(() => {
    const useMedicalSpecialityMock = useMedicalSpeciality as jest.Mocked<typeof useMedicalSpeciality>;
    useMedicalSpecialityMock.useMedicalSpeciality.mockReturnValue({
      getMedicalSpecialityName: jest.fn(() => '内科'),
    } as unknown as ReturnType<typeof useMedicalSpecialityMock.useMedicalSpeciality>);
  });

  test('初回回答時間がある', async () => {
    const consultExample: ConsultExampleDetailEntity = {
      ...baseConsultExample,
    };

    render(
      <RecoilRoot>
        <ConsultExampleDetail consultExample={consultExample} consultExampleMessages={[]} />
      </RecoilRoot>
    );

    expect(await act(async () => await waitFor(() => screen.getByText('初回回答まで')))).toBeInTheDocument();
  });

  test('初回回答時間がない', async () => {
    const consultExample: ConsultExampleDetailEntity = {
      ...baseConsultExample,
      first_answer_minutes: 0,
    };

    render(
      <RecoilRoot>
        <ConsultExampleDetail consultExample={consultExample} consultExampleMessages={[]} />
      </RecoilRoot>
    );

    expect(await act(async () => await waitFor(() => screen.queryByText('初回回答まで')))).not.toBeInTheDocument();
  });

  test('グループではない場合', async () => {
    const consultExample: ConsultExampleDetailEntity = {
      ...baseConsultExample,
      speciality_code: 'not empty',
    };

    render(
      <RecoilRoot>
        <ConsultExampleDetail consultExample={consultExample} consultExampleMessages={[]} />
      </RecoilRoot>
    );

    expect(await act(async () => await waitFor(() => screen.getByText('内科')))).toBeInTheDocument();
  });

  test('グループの場合', async () => {
    const consultExample: ConsultExampleDetailEntity = {
      ...baseConsultExample,
      category_name: 'グループ1',
    };

    render(
      <RecoilRoot>
        <ConsultExampleDetail consultExample={consultExample} consultExampleMessages={[]} />
      </RecoilRoot>
    );

    expect(await act(async () => await waitFor(() => screen.getByText('グループ1')))).toBeInTheDocument();
    expect(await act(async () => await waitFor(() => screen.queryByText('内科')))).not.toBeInTheDocument();
  });

  test('いいねされている', async () => {
    const consultExample: ConsultExampleDetailEntity = {
      ...baseConsultExample,
      is_liked: true,
      showConsultQuestionFlag: true,
    };

    const { getByAltText } = await render(
      <RecoilRoot>
        <ConsultExampleDetail consultExample={consultExample} consultExampleMessages={[]} />
      </RecoilRoot>
    );

    expect(await act(async () => await waitFor(() => getByAltText('いいね済み')))).toBeInTheDocument();
  });

  test('メッセージがいいねされている', async () => {
    const consultExample: ConsultExampleDetailEntity = {
      ...baseConsultExample,
    };

    const { getByAltText } = await render(
      <RecoilRoot>
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
              showConsultQuestionFlag: true,
            },
          ]}
        />
      </RecoilRoot>
    );

    expect(await act(async () => await waitFor(() => getByAltText('いいね済み')))).toBeInTheDocument();
  });
});
