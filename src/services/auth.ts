import axios from 'axios';
import { LOCAL_URL } from './course';

export const BASE_URL = 'https://ta-similarity-ide.herokuapp.com/';

export type loginPayload = {
  username: string | undefined;
  password: string | undefined;
};

export const login = async (payload: loginPayload) => {
  const res = await axios.post(`${LOCAL_URL}login`, payload);
  return res.data;
};

export const register = async (payload: any, token: string) => {
  const res = await axios.post(`${LOCAL_URL}register`, payload, {
    headers: { Authorization: token },
  });
  return res.data;
};
