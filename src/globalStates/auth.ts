import { atom } from 'jotai';

export const tokenState = atom<string>('');

export const isTokenInitializedState = atom<boolean>(false);

export const isTokenRefreshedState = atom<boolean>(false);
