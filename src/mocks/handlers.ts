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
import { registerMock } from '@/features/register/registerMock';

export const handlers = [
  rest.get('/api/doctor/profile', getProfileMock),
  rest.post('/api/doctor/update_profile', updateProfileMock),
  rest.get('/api/medii_point/current_point', getCurrentPointMock),
  rest.get('/api/medii_point/point_history', getPointHistoriesMock),
  rest.get('/api/amazon_gift/amazon_gift_list', getAmazonGiftsMock),
  rest.post('/api/amazon_gift/purchase_amazon_gift', postAmazonGiftsMock),
  rest.post('/api/doctor/create_account', registerMock),
];
