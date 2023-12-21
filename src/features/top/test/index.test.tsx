import React from 'react';
import { render, screen } from '@testing-library/react';
import { Top } from '../index';
import { act } from 'react-dom/test-utils';

import { useFetchFlag } from '@/hooks/api/account/useFetchFlags';
import { useRouter } from 'next/router';
import { useNews } from '@/hooks/api/medii/useNews';
import { useTop } from '../useTop';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/hooks/api/account/useFetchFlags');
jest.mock('@/hooks/api/medii/useNews');
jest.mock('../useTop');

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {},
  });
  (useNews as jest.Mock).mockReturnValue({
    newsList: [],
  });
});

describe('Top', () => {
  describe('バナー', () => {
    test('アンケートバナー表示＆コンサルバナー非表示', async () => {
      (useFetchFlag as jest.Mock).mockReturnValue({
        flag: false,
      });
      (useTop as jest.Mock).mockReturnValue({
        showTutorialExplanationModal: false,
        setShowTutorialExplanationModal: jest.fn(),
        profile: { main_speciality: 'SOUGOUNAIKA' },
      });

      await act(async () => {
        await render(<Top />);
      });

      expect(screen.queryByTestId('onboarding-questionary-banner')).toBeInTheDocument();
      expect(screen.queryByTestId('consult-campaign-banner')).not.toBeInTheDocument();
    });

    test('アンケートバナー非表示＆コンサルバナー表示', async () => {
      (useFetchFlag as jest.Mock).mockReturnValue({
        flag: true,
      });

      await act(async () => {
        await render(<Top />);
      });

      expect(screen.queryByTestId('onboarding-questionary-banner')).not.toBeInTheDocument();
      expect(screen.queryByTestId('consult-campaign-banner')).toBeInTheDocument();
    });
  });
});
