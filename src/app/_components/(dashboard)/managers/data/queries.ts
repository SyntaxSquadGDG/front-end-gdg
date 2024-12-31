import { BASE_URL } from '@app/_utils/fetch/fetch';
import { getCookie } from 'cookies-next/client';

export const fetchManagers = async (currentPage, limit) => {
  console.log('?ASD');
  const token = getCookie('token');
  console.log(token);
  const response = await fetch(
    `${BASE_URL}/employees?page=${currentPage}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include', // Ensures cookies are sent
    },
  );
  if (!response.ok) {
    throw new Error('Error fetching managers');
  }

  const data = await response.json();
  console.log(data);
  return data;
};

export const fetchManagerActivities = async (currentPage, limit, id) => {
  const response = await fetch(
    `${BASE_URL}/employees/${id}/activities?page=${currentPage}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error('Error fetching activities');
  }

  const data = await response.json();
  return data;
};

export const fetchManager = async (id) => {
  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    next: {
      revalidate: 0,
      tags: ['managerId', id],
    },
  });
  if (!response.ok) {
    throw new Error('Error fetching roles');
  }

  const data = await response.json();
  return data;
};

