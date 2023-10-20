import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { ProfileDetail } from '../ProfileDetail';
import { useProfile } from '@/hooks/useProfile';

jest.mock('@/hooks/useProfile');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
describe('ProfileDetail', () => {
  describe('nmo', () => {
    test('nmoでない場合は利用区分を表示する', async () => {
      const useProfileMock = useProfile as jest.Mocked<typeof useProfile>;
      (useProfileMock as jest.Mock).mockReturnValue({
        profile: {
          registration_source: '',
        },
      });

      act(() => {
        render(
          <RecoilRoot>
            <ProfileDetail
              onEdit={() => {
                return;
              }}
            />
          </RecoilRoot>
        );
      });

      expect(screen.queryByTestId('profile-detail-usage-classification')).toBeInTheDocument();
    });

    test('nmoの場合は利用区分を表示しない', async () => {
      const useProfileMock = useProfile as jest.Mocked<typeof useProfile>;
      (useProfileMock as jest.Mock).mockReturnValue({
        profile: {
          registration_source: 'nmo',
        },
      });

      act(() => {
        render(
          <RecoilRoot>
            <ProfileDetail
              onEdit={() => {
                return;
              }}
            />
          </RecoilRoot>
        );
      });

      expect(screen.queryByTestId('profile-detail-usage-classification')).not.toBeInTheDocument();
    });
  });
});
