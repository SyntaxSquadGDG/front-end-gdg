import { fetchData2 } from '@app/_utils/fetch';

export const createSection = async (data) => {
  return await fetchData2(
    `/Sections/newsection?name=${data.sectionName}`,
    'POST',
  );
};

