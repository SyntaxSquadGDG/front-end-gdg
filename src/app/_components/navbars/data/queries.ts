import { fetchData } from '@app/_utils/fetch';

export const fetchUserData = async () => {
  console.log('ASD');
  return await fetchData('/me');
};

