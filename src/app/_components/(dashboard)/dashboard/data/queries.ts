import { fetchData } from '@app/_utils/fetch';

export const fetchFileTypeResults = async () => {
  return await fetchData(`/file-type-results`);
};

export const fetchStoragePercentages = async () => {
  return await fetchData(`/storage-results`);
};

export const fetchCategorizationAccuracy = async () => {
  return await fetchData(`/categorization-results`);
};

