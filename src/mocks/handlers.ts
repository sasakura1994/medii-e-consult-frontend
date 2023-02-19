import { rest } from 'msw';
import {
  getProfileMock,
  updateProfileMock,
  getCurrentPointMock,
  getPointHistoriesMock,
} from './mocks';

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users', getProfileMock),
  rest.get('https://jsonplaceholder.typicode.com/posts/1', getProfileMock),
  rest.put('https://jsonplaceholder.typicode.com/posts/1', updateProfileMock),
  rest.get('https://jsonplaceholder.typicode.com/users/2', getCurrentPointMock),
  rest.get(
    'https://jsonplaceholder.typicode.com/users/1',
    getPointHistoriesMock
  ),
];
