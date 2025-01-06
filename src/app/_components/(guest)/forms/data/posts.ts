import { fetchData } from '@app/_utils/fetch';

export const forgetPassword = async (data) => {
  return await fetchData('/forget-password', 'POST', data);
};

export const login = async (data) => {
  return await fetchData('/login', 'POST', data);
};

export const registerUser = async (data) => {
  return await fetchData('/register', 'POST', data);
};

export const newPassword = async (data) => {
  return await fetchData('/new-password', 'POST', data);
};

