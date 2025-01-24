import { BASE_URL, SECOND_URL } from '@app/_constants/fetch';
import { fetchData, fetchData2 } from '@app/_utils/fetch';
import { getCookie } from 'cookies-next';

export const fetchAllFolders = async () => {
  const res = await fetchData2(`/Sections/FoldersByParentId?id=${4}`);
  return res;
};

export const fetchFolderPath = async (id) => {
  return await fetchData2(
    `/Folders/path?id=${id}`,
    'GET',
    {},
    {
      next: {
        tags: [`folder${id}`],
      },
    },
  );
};

export const fetchFolderSectionName = async (id) => {
  const token = getCookie('token');
  const response = await fetch(
    `${SECOND_URL}/Folders/SectionNameForFolder?id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // credentials: 'include', // Ensures cookies are sent
    },
  );

  if (!response.ok) {
    throw new Error('Error fetching section name');
  }

  const data = await response.json();
  return data;
};

export const fetchFolderFolders = async (id, page, limit) => {
  const res = await fetchData2(`/Folders/FoldersByParentId?id=${id}`);
  // console.log(res);
  return res.folders;
};

export const fetchFolderFiles = async (id, page, limit) => {
  const res = await fetchData2(`/Folders/FoldersByParentId?id=${id}`);
  console.log(res);
  return res.files;
};

export const fetchFolderSettings = async (id) => {
  return await fetchData(`/folder-settings/${id}`);
};

export const fetchFolderMetadata = async (id) => {
  return await fetchData(`/metadata/${id}`);
};

export const fetchFolderMoveAvailableStructure = async (id) => {
  return await fetchData(`/structure`);
};

