import { createApiClient } from '@/libs/apiClient';

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
});
