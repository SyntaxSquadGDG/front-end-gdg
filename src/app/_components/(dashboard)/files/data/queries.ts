import { BASE_URL, SECOND_URL } from '@app/_components/_constants/fetch';
import { getCookie } from 'cookies-next';

export const fetchFileData = async (id) => {
  const token = getCookie('token');
  const response = await fetch(`${SECOND_URL}/Sfiles/filebyid?fileid=${id}`, {
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

export const fetchFilePath = async (id) => {
  const token = getCookie('token');
  const response = await fetch(`${SECOND_URL}/Sfiles/Path/${id}`, {
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

export const fetchFileVersions = async (page, limit, id) => {
  const token = getCookie('token');
  const response = await fetch(
    `${BASE_URL}/versions?page=${page}&limit=${limit}`,
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

export const fetchFileVersion = async (
  fileId,
  versionId,
  setLoading,
  setError,
  onSuccess,
  toast,
  t,
) => {
  let errorText;
  try {
    setError(null);
    setLoading(true);
    const token = getCookie('token');
    const response = await fetch(`${BASE_URL}/versions?page=${1}&limit=${5}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // credentials: 'include', // Ensures cookies are sent
    });

    if (!response.ok) {
      throw new Error('VERSION_FETCH_ERROR');
    }

    await onSuccess();
    const data = await response.json();
    return data;
  } catch (error) {
    errorText = t(`files.errors.${error.message}`);
    toast.error(errorText);
    setError(errorText);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  } finally {
    setLoading(false);
  }
};

export const fetchFileSettings = async (id, setError, t, toast) => {
  let errorText;
  try {
    const token = getCookie('token');
    const response = await fetch(`${BASE_URL}/file-settings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // credentials: 'include', // Ensures cookies are sent
    });

    if (!response.ok) {
      throw new Error('FILE_SETTINGS_ERROR');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    errorText = t(`files.errors.${error.message}`);
    toast.error(errorText);
    setError(errorText);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  }
};

export const fetchFileMetadata = async (id, setError, t, toast) => {
  let errorText;

  try {
    setError(null);
    const token = getCookie('token');

    const response = await fetch(`${BASE_URL}/file-metadata/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log(response);
      throw new Error('FILE_METADATA_FETCH_ERROR');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    errorText = t(`files.errors.${error.message}`);
    toast.error(errorText);
    setError(errorText);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  }
};

