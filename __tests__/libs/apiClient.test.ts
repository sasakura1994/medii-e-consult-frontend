import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createApiClient } from '@/libs/apiClient';

const mock = new MockAdapter(axios);

describe('createApiClient', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
        pathname: '/',
        search: '',
        hostname: '',
      },
      writable: true,
    });
  });

  test('should add token to headers when token is provided', () => {
    const token = 'dummy_token';
    const apiClient = createApiClient({ token });
    expect(apiClient.defaults.headers.Authorization).toEqual(`Bearer ${token}`);
  });

  test('should not add token to headers when token is not provided', () => {
    const apiClient = createApiClient();
    expect(apiClient.defaults.headers.Authorization).toBeUndefined();
  });

  test('should handle 401 error', async () => {
    mock.onGet('/dummy').reply(401);
    const apiClient = createApiClient();
    await expect(apiClient.get('/dummy')).rejects.toMatchObject({
      message: '認証に失敗しました',
      status: 401,
    });
  });

  test('should handle 403 error', async () => {
    mock.onGet('/dummy').reply(403);
    const apiClient = createApiClient();
    await expect(apiClient.get('/dummy')).rejects.toMatchObject({
      message: 'アクセス権限がありません',
      status: 403,
    });
  });

  test('should handle 404 error', async () => {
    mock.onGet('/dummy').reply(404);
    const apiClient = createApiClient();
    await expect(apiClient.get('/dummy')).rejects.toMatchObject({
      message: 'ページが見つかりません',
      status: 404,
    });
  });

  test('should handle 422 error', async () => {
    mock.onGet('/dummy').reply(422);
    const apiClient = createApiClient();
    await expect(apiClient.get('/dummy')).rejects.toMatchObject({
      message: '不具合によりアクセスできません',
      status: 422,
    });
  });

  test('should handle 500 error', async () => {
    mock.onGet('/dummy').reply(500);
    const apiClient = createApiClient();
    await expect(apiClient.get('/dummy')).rejects.toMatchObject({
      message: 'サーバーでエラーが発生しました',
      status: 500,
    });
  });

  test('should handle 503 error', async () => {
    mock.onGet('/dummy').reply(503);
    const apiClient = createApiClient();
    await expect(apiClient.get('/dummy')).rejects.toMatchObject({
      message: 'アクセス集中により只今ご利用できません',
      status: 503,
    });
  });

  test('should handle network error', async () => {
    mock.onGet('/dummy').networkError();
    const apiClient = createApiClient();
    await expect(apiClient.get('/dummy')).rejects.toMatchObject({
      message: 'ネットワークエラー',
    });
  });
});
