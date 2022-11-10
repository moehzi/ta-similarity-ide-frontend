import axios from 'axios';

export const LOCAL_URL = process.env.REACT_APP_LOCAL_URL;

export const getAllCourse = async (token: string) => {
  const res = await axios.get(`${LOCAL_URL}courses`, {
    headers: {
      Autrhorization: token,
    },
  });
  return res.data;
};

export const getMyCourse = async (token: string) => {
  const res = await axios.get(`${LOCAL_URL}my-course`, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

export const getCourseById = async (token: string, courseId: string) => {
  const res = await axios.get(`${LOCAL_URL}courses/${courseId}`, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

export const editCourse = async (
  token: string,
  payload: any,
  courseId: string
) => {
  return await axios.put(`${LOCAL_URL}courses/${courseId}`, payload, {
    headers: { Authorization: token },
  });
};

export const deleteCourse = async (token: string, courseId: string) => {
  return await axios.delete(`${LOCAL_URL}courses/${courseId}`, {
    headers: { Authorization: token },
  });
};

export const joinCourse = async (token: string, classId: string) => {
  return axios.post(
    `${LOCAL_URL}join-class/${classId}`,
    {},
    { headers: { Authorization: token } }
  );
};

export const createCourse = async (token: string, payload: any) => {
  // TODO dont forget to change the URL
  return axios.post(`${LOCAL_URL}courses`, payload, {
    headers: { Authorization: token },
  });
};

export const createWork = async (
  token: string,
  payload: any,
  courseId: string
) => {
  // TODO dont forget to change the URL
  return axios.post(`${LOCAL_URL}courses/${courseId}/works`, payload, {
    headers: { Authorization: token },
  });
};

export const GET_ALL_COURSE = `${LOCAL_URL}courses`;
export const GET_MY_COURSE = `${LOCAL_URL}my-course`;
export const DETAIL_COURSE = (courseId: string) =>
  `${LOCAL_URL}class/${courseId}/works`;
export const DETAIL_STUDENT_WORKS = (courseId: string) =>
  `${LOCAL_URL}courses/${courseId}/my-works`;
