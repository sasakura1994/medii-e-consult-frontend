import { rest } from 'msw';
import {
  getProfileMock,
  getCurrentPointMock,
  getPointHistoriesMock,
} from './mocks';

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users', getProfileMock),
  rest.get('https://jsonplaceholder.typicode.com/users/2', getCurrentPointMock),
  rest.get(
    'https://jsonplaceholder.typicode.com/users/1',
    getPointHistoriesMock
  ),
];
