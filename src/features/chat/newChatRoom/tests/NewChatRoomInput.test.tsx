import React from 'react';

import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { NewChatRoomInput } from '../NewChatRoomInput';
import { UseNewChatRoom } from '../useNewChatRoom';

const baseUseNewChatRoom = {
  chatRoom: { room_type: 'FREE' },
  filesForReConsult: [],
  query: {},
  reConsultFileMessages: [],
  selectedMedicalSpecialities: [],
} as unknown as UseNewChatRoom;

describe('NewChatRoomInput', () => {
  describe('再コンサル用の表示', () => {
    test('再コンサルでない場合は表示しない', () => {
      render(
        <RecoilRoot>
          <NewChatRoomInput
            {...{
              ...baseUseNewChatRoom,
            }}
          />
        </RecoilRoot>
      );

      expect(
        screen.queryByTestId('reconsult-free-note')
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('room-type-group-container')
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId('reconsult-image-note')
      ).not.toBeInTheDocument();
    });

    test('再コンサルの場合は表示する', () => {
      render(
        <RecoilRoot>
          <NewChatRoomInput
            {...{
              ...baseUseNewChatRoom,
              query: { reconsult: 'chatroomid' },
            }}
          />
        </RecoilRoot>
      );

      expect(screen.queryByTestId('reconsult-free-note')).toBeInTheDocument();
      expect(
        screen.queryByTestId('room-type-group-container')
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId('reconsult-image-note')).toBeInTheDocument();
    });
  });
});
