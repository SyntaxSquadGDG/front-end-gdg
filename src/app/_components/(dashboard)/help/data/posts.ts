import { fetchData } from '@app/_utils/fetch';

export const sendMessage = async (data) => {
  return await fetchData(`/messages`, 'POST', data);
};

