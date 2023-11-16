import { SearchParam } from '@/features/auth/useSearchParams';
import axios from 'axios';

type LoginResponseData = {
  jwt_token: string;
  login_type: string;
};

export const useFetchToken = async () => {
  const token = SearchParam();
  const endpoint = token ? `/apple_auth/get_token?token_id=${token}` : '';

  const response = await axios.get<LoginResponseData>(endpoint).catch((error) => {
    console.error(error);
  });
  
  return response;
};
