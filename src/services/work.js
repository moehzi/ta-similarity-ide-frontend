import axios from 'axios';
import { LOCAL_URL } from './course';

export const DETAIL_WORK = (workId) => `${LOCAL_URL}works/${workId}`;
export const submitWork = (token, workId, payload) => {
  return axios.post(`${LOCAL_URL}works/${workId}/submit-work`, payload, {
    headers: { Authorization: token },
  });
};

export const testWork = (token, workId, payload) => {
  return axios.post(`${LOCAL_URL}works/${workId}/test-work`, payload, {
    headers: { Authorization: token },
  });
};

export const changeVisible = (token, workId) => {
  return axios.post(
    `${LOCAL_URL}works/${workId}/visible`,
    {},
    { headers: { Authorization: token } }
  );
};

export const checkSimilarityStudent = (token, workId, payload) => {
  return axios.post(`${LOCAL_URL}check-similarity/${workId}`, payload, {
    headers: { Authorization: token },
  });
};

export const editWork = async (token, workId, payload) => {
  return await axios.put(`${LOCAL_URL}works/${workId}`, payload, {
    headers: { Authorization: token },
  });
};

export const GET_WORK_BY_ID = (workId) => `${LOCAL_URL}works/${workId}`;

export const deleteWork = async (token, workId) => {
  return await axios.delete(`${LOCAL_URL}works/${workId}`, {
    headers: { Authorization: token },
  });
};
