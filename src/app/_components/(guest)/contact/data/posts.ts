import { fetchData } from '@app/_utils/fetch';

export const contact = async (data) => {
  return await fetchData('/contact', 'POST', data);
};
