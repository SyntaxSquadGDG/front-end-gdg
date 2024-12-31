import { BASE_URL } from '@app/_utils/fetch/fetch';
import { getCookie } from 'cookies-next';

export const fetchFileTypeResults = async () => {
  const token = getCookie('token');
  const response = await fetch(`${BASE_URL}/file-type-results`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include', // Ensures cookies are sent
  });
  console.log(response);
  if (!response.ok) {
    const errorText = await response.text();
    console.log(errorText);
    throw new Error(errorText);
  }

  const data = await response.json();
  console.log(data);
  return data;
};

export const fetchStoragePercentages = async () => {
  const token = getCookie('token');
  const response = await fetch(`${BASE_URL}/storage-results`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include', // Ensures cookies are sent
  });
  console.log(response);
  if (!response.ok) {
    const errorText = await response.text();
    console.log(errorText);
    throw new Error(errorText);
  }

  const data = await response.json();
  console.log(data);
  return data;
};

export const fetchCategorizationAccuracy = async () => {
  const token = getCookie('token');
  const response = await fetch(`${BASE_URL}/categorization-results`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include', // Ensures cookies are sent
  });
  console.log(response);
  if (!response.ok) {
    const errorText = await response.text();
    console.log(errorText);
    throw new Error(errorText);
  }

  const data = await response.json();
  console.log(data);
  return data;
};

