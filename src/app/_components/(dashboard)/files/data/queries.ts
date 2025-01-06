import { fetchBlob, fetchData, fetchData2 } from '@app/_utils/fetch';

export const fetchAllFiles = async (id) => {
  return await fetchData(`/Sfiles/filebyid?fileid=${id}`);
};

export const fetchFileData = async (id) => {
  return await fetchData2(`/Sfiles/filebyid?fileid=${id}`);
};

export const fetchFilePath = async (id) => {
  return await fetchData2(`/Sfiles/Path/${id}`);
};

export const fetchFileVersions = async (id, page, limit) => {
  return await fetchData(`/versions?page=${page}&limit=${limit}`);
};

export const fetchFileVersion = async (fileId, versionId) => {
  return await fetchBlob(`https://picsum.photos/200`);
};

export const fetchFileSettings = async (id) => {
  return await fetchData(`/file-settings/${id}`);
};

export const fetchFileMetadata = async (id) => {
  return await fetchData(`/file-metadata/${id}`);
};

export const fetchFileMoveAvailableStructure = async (id) => {
  return await fetchData(`/files-structure/${id}`);
};

export const fetchFilePreview = async (id) => {
  return await fetchData2(`/sfiles/filebyidpreview?fileid=${id}`);
};
