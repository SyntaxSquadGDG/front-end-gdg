import { fetchData, fetchData2 } from '@app/_utils/fetch';

export const deleteFile = async (id) => {
  return await fetchData2(`/Sfiles/deleteById?fileid=${id}`, 'DELETE');
};

export const deleteFileVersion = async (fileId, versionId) => {
  return fetchData(`/versions/${versionId}`);
};

