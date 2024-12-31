import { BASE_URL } from '@app/_utils/fetch/fetch';
import { getCookie } from 'cookies-next';

export const fetchMessages = async (currentPage, limit) => {
  const token = getCookie('token');
  const response = await fetch(
    `${BASE_URL}/messages?page=${currentPage}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include', // Ensures cookies are sent
    },
  );

  if (!response.ok) {
    throw new Error('Error fetching messages');
  }

  const data = await response.json();
  return data;
};

