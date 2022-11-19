import axios from 'axios';
import { LOCAL_URL } from './course';

export const DETAIL_STUDENT_WORK = (workId, studentId) =>
  `${LOCAL_URL}detail-work/${workId}/student/${studentId}`;

export const updateScore = async (codeId, token, payload) => {
  return await axios.put(`${LOCAL_URL}works/code/${codeId}/score`, payload, {
    headers: { Authorization: token },
  });
};
