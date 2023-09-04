import React from 'react';
import { render, screen } from '@testing-library/react';
import { Top } from '../index';
import { act } from 'react-dom/test-utils';
import { RecoilRoot } from 'recoil';
import { useFetchFlag } from '@/hooks/api/account/useFetchFlags';
import { useRouter } from 'next/router';
import { useNews } from '@/hooks/api/medii/useNews';

jest.mock('next/router');
jest.mock('@/hooks/api/account/useFetchFlags');
jest.mock('@/hooks/api/medii/useNews');

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

      await act(async () => {
        await render(
          <RecoilRoot>
            <Top />
          </RecoilRoot>
        );
      });

      expect(screen.queryByTestId('onboarding-questionary-banner')).toBeInTheDocument();
      expect(screen.queryByTestId('consult-campaign-banner')).not.toBeInTheDocument();
    });

    test('アンケートバナー非表示＆コンサルバナー表示', async () => {
      (useFetchFlag as jest.Mock).mockReturnValue({
        flag: true,
      });

      await act(async () => {
        await render(
          <RecoilRoot>
            <Top />
          </RecoilRoot>
        );
      });

      expect(screen.queryByTestId('onboarding-questionary-banner')).not.toBeInTheDocument();
      expect(screen.queryByTestId('consult-campaign-banner')).toBeInTheDocument();
    });
  });
});
