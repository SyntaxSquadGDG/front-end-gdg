import { fetchData } from '@app/_utils/fetch';

export const fetchUserPersonalInfo = async () => {
  return await fetchData(`/me`);
};

