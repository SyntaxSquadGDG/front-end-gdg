import { fetchBlob, fetchData, fetchData2 } from '@app/_utils/fetch';

export const fetchAllFiles = async (id) => {
  const res = await fetchData2(`/Folders/FoldersByParentId?id=${4}`);
  return res.files;

  // return await fetchData(`/Sfiles/filebyid?fileid=${id}`);
};

export const fetchFileData = async (id) => {
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAA');
  const res = await fetchData2(
    `/Sfiles/filebyid?fileid=${id}`,
    'GET',
    {},
    {
      next: {
        tags: [`file${id}Data`],
      },
    },
  );
  console.log(res);
  return res;
};

export const fetchFilePath = async (id) => {
  return await fetchData2(
    `/Sfiles/Path/${id}`,
    'GET',
    {},
    {
      next: {
        tags: [`file${id}Path`],
      },
    },
  );
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
  return await fetchData(`/structure`);
};

export const fetchFilePreview = async (id) => {
  console.log('AAAApppppppppppppppp');
  // return [];
  const res = await fetchData2(
    `/sfiles/filebyidpreview?fileid=${id}`,
    'GET',
    {},
    {
      next: {
        tags: [`file${id}Preview`],
      },
    },
  );
  console.log(res);
  return res;
};

export const fetchFileFolderMetadata = async (id) => {
  return await fetchData(`/metadata/${id}`);
};

