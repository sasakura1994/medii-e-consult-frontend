import { rest } from 'msw';
import { getProfileMock, updateProfileMock } from './profileMock';
import {
  getCurrentPointMock,
  getPointHistoriesMock,
} from '@/features/mypages/pointHistory/pointMock';
import {
  getAmazonGiftsMock,
  postAmazonGiftsMock,
} from '@/features/mypages/amazonGift/amazonGiftMock';
import { getQrCodeMock } from '@/features/mypages/affiliate/affiliateMock';

// TODO: エンドポイントを正規のURLに変更する
export const handlers = [
  rest.get('https://chart.googleapis.com/chart', getQrCodeMock),
  rest.get('https://jsonplaceholder.typicode.com/users', getProfileMock),
  rest.get('https://jsonplaceholder.typicode.com/posts/1', getProfileMock),
  rest.put('https://jsonplaceholder.typicode.com/posts/1', updateProfileMock),
  rest.get('https://jsonplaceholder.typicode.com/users/2', getCurrentPointMock),
  rest.get(
    'https://jsonplaceholder.typicode.com/users/3',
    getPointHistoriesMock
  ),
  rest.get('https://jsonplaceholder.typicode.com/users/4', getAmazonGiftsMock),
  rest.post('https://jsonplaceholder.typicode.com/posts', postAmazonGiftsMock),
];
