import { BASE_URL } from '@app/_constants/fetch';
import { fetchData, fetchData2 } from '@app/_utils/fetch';

export const restoreFileVersion = async (fileId, versionId) => {
  return await fetchData(`/versions/${versionId}`, 'POST');
};

export const uploadNewFileVersion = async (fileId, data) => {
  return await fetchData(`/versions`, 'POST', data);
};

export const lockFile = async (fileId) => {
  return await fetchData(`/versions`, 'POST');
};

export const unlockFile = async (fileId) => {
  return await fetchData(`/versions`, 'POST');
};

export const moveFileToFolder = async (fileId, folderId) => {
  return await fetchData(`/movefiletofolder/${fileId}/${folderId}`);
};

export const copyFileToFolder = async (fileId, folderId) => {
  return await fetchData(`/copyfiletofolder/${fileId}/${folderId}`);
};

export const classifyAIFiles = async (data) => {
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Delay for 5 seconds
  return await fetchData(`/sendAIFiles`, 'POST', data);
};

export const sendFilesToFolder = async (folderId, data) => {
  return await fetchData2(`/Sfiles/upload?folderId=${folderId}`, 'POST', data);
};

export const confirmAIFiles = async (folderId, data) => {
  console.log('????');
  console.log(folderId);
  console.log(data);
  return await fetchData2(`/Sfiles/upload?folderId=${folderId}`, 'POST', data);
};

