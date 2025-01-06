import { fetchData2 } from '@app/_utils/fetch';

export const deleteFolder = async (id) => {
  return await fetchData2(`/Folders/deletefolderbyid?id=${id}`, 'DELETE');
};
