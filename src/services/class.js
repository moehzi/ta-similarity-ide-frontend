import { LOCAL_URL } from './course';
import axios from 'axios';

export const GET_LIST_CLASS_BY_COURSEID = (courseId) =>
  `${LOCAL_URL}class/${courseId}`;

export const createClass = async (token, payload, courseId) => {
  return axios.post(`${LOCAL_URL}class/${courseId}`, payload, {
    headers: { Authorization: token },
  });
};

export const USER_CLASS = () => `${LOCAL_URL}my-class`;

export const GET_LIST_ALL_CLASS = () => `${LOCAL_URL}class`;

export const editClass = async (token, payload, classId) => {
  return await axios.put(`${LOCAL_URL}class/${classId}`, payload, {
    headers: { Authorization: token },
  });
};

export const deleteClass = async (token, classId) => {
  return await axios.delete(`${LOCAL_URL}class/${classId}`, {
    headers: { Authorization: token },
  });
};
