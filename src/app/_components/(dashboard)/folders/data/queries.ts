import { BASE_URL, SECOND_URL } from '@app/_components/_constants/fetch';
import { getCookie } from 'cookies-next';

export const fetchFolderPath = async (id) => {
  const token = getCookie('token');
  const response = await fetch(`${SECOND_URL}/Folders/path?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // credentials: 'include', // Ensures cookies are sent
  });

  if (!response.ok) {
    throw new Error('Error fetching section name');
  }

  const data = await response.json();
  console.log(data);
  return data;
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

export const fetchFolderFolders = async (page, limit, id) => {
  console.log('TRYING...');
  const token = getCookie('token');
  const response = await fetch(
    `${SECOND_URL}/Folders/FoldersByParentId?id=${id}`,
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
  console.log(data);
  return data;
};

export const fetchFolderSettings = async (id, setError, t, toast) => {
  let errorText;
  try {
    const token = getCookie('token');
    const response = await fetch(`${BASE_URL}/folder-settings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // credentials: 'include', // Ensures cookies are sent
    });

    if (!response.ok) {
      throw new Error('FOLDER_SETTINGS_ERROR');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    errorText = t(`folders.errors.${error.message}`);
    toast.error(errorText);
    setError(errorText);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  }
};

export const fetchFolderMetadata = async (id, setError, t, toast) => {
  let errorText;
  console.log('55555555555555555555555555555555555555555');
  try {
    const token = getCookie('token');
    const response = await fetch(`${BASE_URL}/metadata/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // credentials: 'include', // Ensures cookies are sent
    });

    if (!response.ok) {
      throw new Error('FOLDER_METADATA_ERROR');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    errorText = t(`folders.errors.${error.message}`);
    toast.error(errorText);
    setError(errorText);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  }
};

