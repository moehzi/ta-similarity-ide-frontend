import axios from 'axios';

export const BASE_URL = 'https://ta-similarity-ide.herokuapp.com/';

export type loginPayload = {
  username: string | undefined;
  password: string | undefined;
};

export const login = async (payload: loginPayload) => {
  const res = await axios.post(`${BASE_URL}login`, payload);
  return res.data;
};
