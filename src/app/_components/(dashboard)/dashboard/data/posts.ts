import { fetchData } from '@app/_utils/fetch';

export const trainModel = async () => {
  return await fetchData(`/trains`, 'POST');
};

