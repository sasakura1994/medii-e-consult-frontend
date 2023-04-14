import { Card } from '@/components/Parts/Card/Card';
import React from 'react';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';

type Props = {
  chatRoom: ChatRoomEntity;
};

export const AlreadyAssigned: React.FC<Props> = ({ chatRoom }: Props) => {
  return (
    <Card className="px-4 py-8 lg:px-20 lg:py-8" spNoBorder>
      <div data-testid="assign-already-assigned"></div>
      already assigned
    </Card>
  );
};
