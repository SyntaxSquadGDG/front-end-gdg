import { fetchData } from '@app/_utils/fetch';

export const fetchMessages = async (page, limit) => {
  return await fetchData(`/messages?page=${page}&limit=${limit}`);
};

