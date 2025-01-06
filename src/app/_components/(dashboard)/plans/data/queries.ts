import { fetchData } from '@app/_utils/fetch';

export const fetchActivePlan = async () => {
  return await fetchData(`/active-plan`);
};

