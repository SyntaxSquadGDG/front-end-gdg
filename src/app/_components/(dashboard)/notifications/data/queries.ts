import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { fetchData } from '@app/_utils/fetch';

export const fetchNotifications = async (
  page = 1,
  limit = PAGINATION_PAGE_LIMIT,
) => {
  return await fetchData(`/notifications?page=${page}&limit=${limit}`);
};

