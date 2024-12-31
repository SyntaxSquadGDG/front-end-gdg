import { BASE_URL } from '@app/_utils/fetch/fetch';

export const fetchUserPersonalInfo = async () => {
  const response = await fetch(`${BASE_URL}/my-data`);

  if (!response.ok) {
    throw new Error('Error fetching activities');
  }

  const data = await response.json();
  return data;
};

