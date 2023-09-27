import { RecoilRoot } from 'recoil';
import 'cross-fetch/polyfill';
import { act, renderHook } from '@testing-library/react';
import { useWithdrawalPage } from '../useWithdrawalPage';
import { useFetchQuestionaryItemsForWithdrawal } from '@/hooks/api/questionary/useFetchQuestionaryItemsForWithdrawal';
import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';

jest.mock('@/hooks/api/doctor/useFetchProfile');
jest.mock('@/hooks/api/questionary/useFetchQuestionaryItemsForWithdrawal');

describe('useWithdrawalPage', () => {
  test('toggleQuestionaryItem', () => {
    const useFetchProfileMock = useFetchProfile as jest.Mocked<typeof useFetchProfile>;
    (useFetchProfileMock as jest.Mock).mockReturnValue({
      isLoading: false,
      profile: {},
    });

    const useFetchQuestionaryItemsForWithdrawalMock = useFetchQuestionaryItemsForWithdrawal as jest.Mocked<
      typeof useFetchQuestionaryItemsForWithdrawal
    >;
    (useFetchQuestionaryItemsForWithdrawalMock as jest.Mock).mockReturnValue({
      questionaryItems: [
        { id: 1, text: '1' },
        { id: 2, text: '2' },
        { id: 3, text: '3' },
      ],
    });

    const hooks = renderHook(() => useWithdrawalPage(), {
      wrapper: RecoilRoot,
    }).result;

    act(() => hooks.current.toggleQuestionaryItem(2));
    act(() => hooks.current.toggleQuestionaryItem(3));

    expect(hooks.current.selectedQuestionaryItemIds).toEqual([2, 3]);

    act(() => hooks.current.toggleQuestionaryItem(2));

    expect(hooks.current.selectedQuestionaryItemIds).toEqual([3]);
  });
});
