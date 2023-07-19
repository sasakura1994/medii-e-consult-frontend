import React from 'react';

import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { NewChatRoomInput } from '../NewChatRoomInput';
import { UseNewChatRoom } from '../useNewChatRoom';
import { GroupEntity } from '@/types/entities/GroupEntity';
import { NewChatRoomEntity } from '@/types/entities/chat/NewChatRoomEntity';

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

  test('実名グループの場合は補足を表示', () => {
    render(
      <RecoilRoot>
        <NewChatRoomInput
          {...{
            ...baseUseNewChatRoom,
            chatRoom: {
              room_type: 'GROUP',
            } as NewChatRoomEntity,
            group: {
              is_real_name: true,
            } as GroupEntity,
          }}
        />
      </RecoilRoot>
    );

    expect(screen.queryByTestId('real-name-note')).toBeInTheDocument();
  });
});
