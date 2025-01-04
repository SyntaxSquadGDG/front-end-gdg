import { BASE_URL } from '@app/_utils/fetch/fetch';
import { getCookie } from 'cookies-next';

export const fetchActivities = async (page, limit) => {
  const token = getCookie('token');
  const response = await fetch(
    `${BASE_URL}/employees/${1735224400}/activities?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include', // Ensures cookies are sent
    },
  );

  if (!response.ok) {
    throw new Error('Error fetching activities');
  }

  const data = await response.json();
  return data;
};

export const fetchMyActivities = async (page, limit) => {
  const token = getCookie('token');

  const response = await fetch(
    `${BASE_URL}/user/activities?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include', // Ensures cookies are sent
    },
  );

  if (!response.ok) {
    throw new Error('Error fetching activities');
  }

  const data = await response.json();
  return data;
};

export const fetchSectionActivities = async (page, limit, id) => {
  const token = getCookie('token');

  const response = await fetch(
    `${BASE_URL}/sections/${id}/activities?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include', // Ensures cookies are sent
    },
  );

  if (!response.ok) {
    throw new Error('Error fetching activities');
  }

  const data = await response.json();
  return data;
};

export const fetchFolderActivities = async (page, limit, id) => {
  const token = getCookie('token');

  const response = await fetch(
    `${BASE_URL}/folders/${id}/activities?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include', // Ensures cookies are sent
    },
  );

  if (!response.ok) {
    throw new Error('Error fetching activities');
  }

  const data = await response.json();
  return data;
};

export const fetchFileActivities = async (page, limit, id) => {
  const token = getCookie('token');

  const response = await fetch(
    `${BASE_URL}/files/${id}/activities?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include', // Ensures cookies are sent
    },
  );

  if (!response.ok) {
    throw new Error('Error fetching activities');
  }

  const data = await response.json();
  return data;
};

