import { PAGINATION_PAGE_LIMIT } from '@app/_constants/fetch';
import { fetchData } from '@app/_utils/fetch';

export const fetchSearchResults = async (
  query,
  page = 1,
  limit = PAGINATION_PAGE_LIMIT,
) => {
  return await fetchData(`/search?query=${query}&page=${page}&limit=${limit}`);
};

