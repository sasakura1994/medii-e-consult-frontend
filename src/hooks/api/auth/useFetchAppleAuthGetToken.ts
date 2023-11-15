import axios from 'axios';
import { useCallback } from 'react';

type fetchAppleAuthGetTokenRequestData = {
  token_id: string;
};

type fetchAppleAuthGetTokenResponseData = {
  jwt_token: string;
  login_type: 'login' | 'register';
};

export const useFetchAppleAuthGetToken = () => {
  const fetchAppleAuthGetToken = useCallback(async (data: fetchAppleAuthGetTokenRequestData) => {
    const { token_id } = data;
    return axios.get<fetchAppleAuthGetTokenResponseData>('/apple_auth/get_token', {
      baseURL: process.env.ENDPOINT_URL,
      headers: { 'Content-Type': 'application/json' },
      params: { token_id: token_id },
    });
  }, []);

  return { fetchAppleAuthGetToken };
};
