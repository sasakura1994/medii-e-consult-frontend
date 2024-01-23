import React from 'react';
import ChatFollowUpQuestionaryPage from '@/pages/follow-up-questionary';
import { useFollowUpQuestionary } from '../useFollowUpQuestionary';
import { render, screen } from '@testing-library/react';

jest.mock('../useFollowUpQuestionary');

describe('/follow-up-questionary', () => {
  test('読み込み中', () => {
    (useFollowUpQuestionary as jest.Mock).mockReturnValue({
      answered: undefined,
      chatRoomId: undefined,
      onSubmit: jest.fn(),
    });

    render(<ChatFollowUpQuestionaryPage />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('回答済み', () => {
    (useFollowUpQuestionary as jest.Mock).mockReturnValue({
      answered: true,
      chatRoomId: undefined,
      onSubmit: jest.fn(),
    });

    render(<ChatFollowUpQuestionaryPage />);

    expect(screen.getByTestId('answered-message')).toBeInTheDocument();
  });

  test('フォームを表示', () => {
    (useFollowUpQuestionary as jest.Mock).mockReturnValue({
      answered: false,
      chatRoomId: undefined,
      onSubmit: jest.fn(),
    });

    render(<ChatFollowUpQuestionaryPage />);

    expect(screen.getByTestId('form')).toBeInTheDocument();
  });
});
