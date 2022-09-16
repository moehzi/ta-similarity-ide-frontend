import { LOCAL_URL } from './course';
import axios from 'axios';

export const GET_LIST_CLASS_BY_COURSEID = (courseId) =>
  `${LOCAL_URL}class/${courseId}`;

export const createClass = async (token, payload, courseId) => {
  return axios.post(`${LOCAL_URL}class/${courseId}`, payload, {
    headers: { Authorization: token },
  });
};

export const GET_LIST_ALL_CLASS = () => `${LOCAL_URL}class`;
