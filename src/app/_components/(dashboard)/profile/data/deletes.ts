import { fetchData } from '@app/_utils/fetch';

export const DeletePersonalImage = async () => {
  return await fetchData(`/my-image`, 'DELETE');
};

