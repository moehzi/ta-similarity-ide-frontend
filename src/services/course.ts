import axios from 'axios';
import { BASE_URL } from './auth';

export const getAllCourse = async (token: string) => {
  const res = await axios.get(`${BASE_URL}courses`, {
    headers: {
      Autrhorization: token,
    },
  });
  return res.data;
};
