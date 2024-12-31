import { BASE_URL } from '@app/_utils/fetch/fetch';
import { getCookie } from 'cookies-next';

export const fetchSearchResults = async (currentPage, limit, query) => {
  const token = getCookie('token');
  const response = await fetch(
    `${BASE_URL}/search?query=${query}&page=${currentPage}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include', // Ensures cookies are sent
    },
  );

  if (!response.ok) {
    throw new Error('Error fetching notifications');
  }

  const data = await response.json();
  return data;
};

