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

export const handlers = [
  rest.get('https://chart.googleapis.com/chart', getQrCodeMock),
  rest.get('/api/doctor/profile', getProfileMock),
  rest.post('/api/doctor/update_profile', updateProfileMock),
  rest.get('/api/medii_point/current_point', getCurrentPointMock),
  rest.get('/api/medii_point/point_history', getPointHistoriesMock),
  rest.get('/api/amazon_gift/amazon_gift_list', getAmazonGiftsMock),
  rest.post('/api/amazon_gift/purchase_amazon_gift', postAmazonGiftsMock),
];
