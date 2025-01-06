import { fetchData } from '@app/_utils/fetch';
import { BASE_URL } from '@app/_utils/fetch/fetch';

export const UpdatePersonalInfo = async (data) => {
  return await fetchData(`/my-data`, 'PUT', data);
};

export const UpdatePersonalPassword = async (data) => {
  return await fetchData(`/my-password`, 'PUT', data);
};

export const UpdatePersonalImage = async (data) => {
  return await fetchData(`my-image`, 'PUT', data);
};

