import { BASE_URL } from '@app/_utils/fetch/fetch';

export const fetchActivePlan = async () => {
  const response = await fetch(`${BASE_URL}/active-plan`);

  if (!response.ok) {
    const errorText = await response.text();
    if (errorText === 'NO ACTIVE') {
      return {
        active: null,
      };
    }
    throw new Error(errorText);
  }

  const data = await response.json();

  return data;
};

