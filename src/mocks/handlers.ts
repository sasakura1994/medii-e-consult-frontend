import { rest } from 'msw';
import {
  getProfileMock,
  updateProfileMock,
  getCurrentPointMock,
  getPointHistoriesMock,
  getAmazonGiftsMock,
  postAmazonGiftsMock,
} from './mocks';

// TODO: エンドポイントを正規のURLに変更する
export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users', getProfileMock),
  rest.get('https://jsonplaceholder.typicode.com/posts/1', getProfileMock),
  rest.put('https://jsonplaceholder.typicode.com/posts/1', updateProfileMock),
  rest.get('https://jsonplaceholder.typicode.com/users/2', getCurrentPointMock),
  rest.get(
    'https://jsonplaceholder.typicode.com/users/1',
    getPointHistoriesMock
  ),
  rest.get('https://jsonplaceholder.typicode.com/users/4', getAmazonGiftsMock),
  rest.post('https://jsonplaceholder.typicode.com/posts', postAmazonGiftsMock),
];
