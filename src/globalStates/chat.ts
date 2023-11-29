import { atom } from 'jotai';

export type ChatState = {
  isSelected: boolean;
  isConsultMenuOpened: boolean;
  isGroupMenuOpened: boolean;
  openChatScrollPosition: number;
  closeChatScrollPosition: number;
};

export const chatState = atom<ChatState>({
  isSelected: false,
  isConsultMenuOpened: true,
  isGroupMenuOpened: true,
  openChatScrollPosition: 0,
  closeChatScrollPosition: 0,
});
