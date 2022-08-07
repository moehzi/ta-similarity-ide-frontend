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

export const getMyCourse = async (token: string) => {
  const res = await axios.get(`${BASE_URL}courses/my-course`, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

export const joinCourse = async (token: string, courseId: string) => {
  return axios.post(
    `${BASE_URL}join-course/${courseId}`,
    {},
    { headers: { Authorization: token } }
  );
};
