import { fetchData, fetchData2 } from '@app/_utils/fetch';

export const createFolderMetadata = async (id, data) => {
  return await fetchData(`/metadata`, 'POST', data);
};

export const moveFolderToFolder = async (folderId, toFolderId) => {
  return await fetchData(
    `/movefoldertofolder/${folderId}/${toFolderId}`,
    'POST',
  );
};

export const moveFolderToSection = async (folderId, sectionId) => {
  return await fetchData(
    `/movefoldertosection/${folderId}/${sectionId}`,
    'POST',
  );
};

export const copyFolderToFolder = async (folderId, toFolderId) => {
  return await fetchData(
    `/copyfoldertofolder/${folderId}/${toFolderId}`,
    'POST',
  );
};

export const copyFolderToSection = async (folderId, sectionId) => {
  return await fetchData(
    `/copyfoldertosection${folderId}/${sectionId}`,
    'POST',
  );
};

export const createFolderToSection = async (sectionId, data) => {
  return await fetchData2(
    `/Folders/newfolder?name=${data.folderName}&FolderParentId&SectionParentId=${sectionId}`,
    'POST',
  );
};

export const createFolderToFolder = async (folderId, data) => {
  return await fetchData2(
    `/Folders/newfolder?name=${data.folderName}&FolderParentId=${folderId}&SectionParentId`,
    'POST',
  );
};

