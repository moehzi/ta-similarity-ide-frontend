import axios from 'axios';
import { LOCAL_URL } from './course';

export const DETAIL_WORK = (workId) => `${LOCAL_URL}works/${workId}`;
export const submitWork = (token, workId, payload) => {
  return axios.post(`${LOCAL_URL}works/${workId}/submit-work`, payload, {
    headers: { Authorization: token },
  });
};
