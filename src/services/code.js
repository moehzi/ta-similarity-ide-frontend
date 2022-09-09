import { LOCAL_URL } from './course';

export const DETAIL_STUDENT_WORK = (workId, studentId) =>
  `${LOCAL_URL}detail-work/${workId}/student/${studentId}`;
