import { fetchData2 } from '@app/_utils/fetch';

export const deleteSection = async (id) => {
  return await fetchData2(`/Sections/deletesection?id=${id}`);
};
