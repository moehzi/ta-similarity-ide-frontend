import { BASE_URL } from './auth';
import axios from 'axios';

export const getProfile = async (token: string) => {
  const res = await axios.get(`${BASE_URL}profile`, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};
