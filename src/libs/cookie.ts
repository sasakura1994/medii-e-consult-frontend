export const setAuthToken = (token: string) => {
  const expiresInHours = 6; // 6時間の有効期限
  const expirationDate = new Date(Date.now() + expiresInHours * 3600000);
  document.cookie = `access_token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
};

export const getAuthToken = (): string | null => {
  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.startsWith('access_token=')
  );
  if (!accessTokenCookie) return null;
  const accessToken = accessTokenCookie.split('=')[1];

  return accessToken || null;
};
