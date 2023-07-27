import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useRouter } from 'next/router';
import { EditingProfile, UseEditProfile } from '../useEditProfile';
import { EditProfileProps } from '../EditProfile';
import { HospitalAffiliation } from '../HospitalAffiliation';

jest.mock('next/router');

describe('HospitalAffiliation', () => {
  const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;
  (useRouterMock as jest.Mock).mockReturnValue({
    query: {},
  });

  describe('病院入力', () => {
    test('病院選択の場合は直接入力を表示しない', async () => {
      act(() => {
        const props = {
          isRegisterMode: true,
          profile: {} as EditingProfile,
          setProfileFields: jest.fn(),
          hospitalInputType: 'select',
        } as unknown as UseEditProfile & EditProfileProps;
        render(
          <RecoilRoot>
            <HospitalAffiliation {...props} />
          </RecoilRoot>
        );
      });

      expect(screen.queryByTestId('hospital-select')).toBeInTheDocument();
      expect(screen.queryByTestId('direct-hospital')).not.toBeInTheDocument();
    });

    test('直接入力の場合は病院選択を表示しない', async () => {
      act(() => {
        const props = {
          isRegisterMode: true,
          profile: {} as EditingProfile,
          setProfileFields: jest.fn(),
          hospitalInputType: 'free',
        } as unknown as UseEditProfile & EditProfileProps;
        render(
          <RecoilRoot>
            <HospitalAffiliation {...props} />
          </RecoilRoot>
        );
      });

      expect(screen.queryByTestId('hospital-select')).not.toBeInTheDocument();
      expect(screen.queryByTestId('direct-hospital')).toBeInTheDocument();
    });
  });
});
