import axios from 'axios';
import { LOCAL_URL } from './course';

export const DETAIL_WORK = (workId) => `${LOCAL_URL}works/${workId}`;
