export const setAuthToken = (token: string) => {
  const expiresInHours = 6; // 6時間の有効期限
  const expirationDate = new Date(Date.now() + expiresInHours * 3600000);
  document.cookie = `access_token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
};

export const getAuthToken = (): string | null => {
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  const accessTokenCookie = cookies.find((cookie) => cookie.startsWith('access_token='));
  if (!accessTokenCookie) return null;
  const accessToken = accessTokenCookie.split('=')[1];

  return accessToken || null;
};

export const getAccountId = (): string | null => {
  const token = getAuthToken();
  if (!token) {
    return null;
  }

  return getAccountIdFromToken(token);
};

export const getAccountIdFromToken = (token: string): string => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload).account_id;
};

export const removeAuthToken = () => {
  document.cookie = `access_token=; expires=${new Date('1999-12-31T23:59:59Z').toUTCString()}; max-age=0; path=/`;
};
