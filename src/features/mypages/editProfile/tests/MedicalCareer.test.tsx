import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useRouter } from 'next/router';
import { EditingProfile, UseEditProfile } from '../useEditProfile';
import { EditProfileProps } from '../EditProfile';
import { MedicalCareer } from '../MedicalCareer';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('MedicalCareer', () => {
  const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
  (useRouterMock as jest.Mock).mockReturnValue({
    query: {},
  });

  describe('医師資格取得年', () => {
    test('常に表示', async () => {
      act(() => {
        const props = {
          isRegisterMode: true,
          profile: {
            qualified_year: '',
          } as EditingProfile,
          setProfileFields: jest.fn(),
        } as unknown as UseEditProfile & EditProfileProps;
        render(<MedicalCareer {...props} />);
      });

      expect(screen.queryByTestId('doctor_qualified_year')).not.toBeInTheDocument();
      expect(screen.queryByTestId('year-input-year')).toBeInTheDocument();
    });

    test('is_hospital_doctor === true の場合は表示', async () => {
      act(() => {
        const props = {
          isRegisterMode: true,
          profile: {
            is_hospital_doctor: true,
            qualified_year: '',
          } as EditingProfile,
          setProfileFields: jest.fn(),
        } as unknown as UseEditProfile & EditProfileProps;
        render(<MedicalCareer {...props} />);
      });

      expect(screen.queryByTestId('year-input-year')).toBeInTheDocument();
    });

    test('招待の場合は表示', async () => {
      act(() => {
        const props = {
          isRegisterMode: true,
          profile: {
            is_invited: true,
            qualified_year: '',
          } as EditingProfile,
          setProfileFields: jest.fn(),
        } as unknown as UseEditProfile & EditProfileProps;
        render(<MedicalCareer {...props} />);
      });

      expect(screen.queryByTestId('year-input-year')).toBeInTheDocument();
    });

    test('utm_sourceで承認の場合は表示', async () => {
      act(() => {
        const props = {
          isRegisterMode: true,
          profile: {
            is_skip_confirmation_by_utm_source: true,
            qualified_year: '',
          } as EditingProfile,
          setProfileFields: jest.fn(),
        } as unknown as UseEditProfile & EditProfileProps;
        render(<MedicalCareer {...props} />);
      });

      expect(screen.queryByTestId('year-input-year')).toBeInTheDocument();
    });

    test('HUFユーザーの場合は表示', async () => {
      act(() => {
        const props = {
          isRegisterMode: true,
          profile: {
            is_huf_user: true,
            qualified_year: '',
          } as EditingProfile,
          setProfileFields: jest.fn(),
        } as unknown as UseEditProfile & EditProfileProps;
        render(<MedicalCareer {...props} />);
      });

      expect(screen.queryByTestId('year-input-year')).toBeInTheDocument();
    });

    test('編集時は入力欄がdisabled', async () => {
      act(() => {
        const props = {
          isRegisterMode: false,
          profile: {
            qualified_year: '2000',
          } as EditingProfile,
          setProfileFields: jest.fn(),
        } as unknown as UseEditProfile & EditProfileProps;
        render(<MedicalCareer {...props} />);
      });

      expect(screen.getByTestId('doctor_qualified_year')).toBeDisabled();
    });

    test('新規登録時はYearInputを表示', async () => {
      act(() => {
        const props = {
          isRegisterMode: true,
          profile: {
            qualified_year: '2000',
          } as EditingProfile,
          setProfileFields: jest.fn(),
        } as unknown as UseEditProfile & EditProfileProps;
        render(<MedicalCareer {...props} />);
      });

      expect(screen.queryByTestId('year-input-year')).toBeInTheDocument();
    });
  });
});
