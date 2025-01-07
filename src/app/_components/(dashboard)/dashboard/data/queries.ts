import { fetchData } from '@app/_utils/fetch';

export const fetchFileTypeResults = async () => {
  return await fetchData(
    `/file-type-results`,
    'GET',
    {},
    {
      next: {
        tags: ['typeResults'],
      },
    },
  );
};

export const fetchStoragePercentages = async () => {
  return await fetchData(
    `/storage-results`,
    'GET',
    {},
    {
      next: {
        tags: ['storage'],
      },
    },
  );
};

export const fetchCategorizationAccuracy = async () => {
  return await fetchData(
    `/categorization-results`,
    'GET',
    {},
    {
      next: {
        tags: ['category'],
      },
    },
  );
};

