import { fetchData } from '@app/_utils/fetch';

export const subscribePlan = async (data) => {
  return await fetchData(`/subscribe-plan`, 'POST', data);
};

export const unsubscribePlan = async (data) => {
  return await fetchData(`/unsubscribe-plan`, 'POST', data);
};

