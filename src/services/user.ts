import axios from 'axios';
import { LOCAL_URL } from './course';

export const getProfile = async (token: string) => {
  const res = await axios.get(`${LOCAL_URL}profile`, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

export const getTeacher = async (token: string) => {
  const res = await axios.get(`${LOCAL_URL}user/teacher`, {
    headers: { Authorization: token },
  });

  return res.data;
};

export const GET_PROFILE = `${LOCAL_URL}profile`;
