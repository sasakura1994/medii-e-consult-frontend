const authTokenKey = 'token';

export const setAuthToken = (token: string) => {
  localStorage.setItem(authTokenKey, token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(authTokenKey);
};
