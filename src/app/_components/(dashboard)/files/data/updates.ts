import { fetchData } from '@app/_utils/fetch';

export const updateFileMetadata = async (id, data) => {
  return await fetchData(`/file-metadata`, 'PUT', data);
};

export const renameFile = async (id, data) => {
  return await fetchData(`/file/${id}`, 'PUT', data);
};

