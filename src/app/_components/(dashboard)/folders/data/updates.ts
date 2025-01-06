import { fetchData } from '@app/_utils/fetch';

export const renameFolder = async (id, data) => {
  return await fetchData(`/folders/${id}`, 'PUT', data);
};

export const updateFolderMetadata = async (id, data) => {
  return await fetchData(`/metadata`, 'PUT', data);
};

