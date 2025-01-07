import { fetchData, fetchData2 } from '@app/_utils/fetch';

export const fetchSections = async (page, limit) => {
  return await fetchData2(
    `/Sections/getallsections?page=${page}&limit=${limit}`,
  );
};

export const fetchSectionName = async (id) => {
  const res = await fetchData2(
    `/Sections/SectioNameById?id=${id}`,
    'GET',
    {},
    {
      next: {
        tags: [`section${id}`],
      },
    },
  );
  return res.name;
};

export const fetchSectionFolders = async (id, page, limit) => {
  const res = await fetchData2(`/Sections/FoldersByParentId?id=${id}`);
  return res;
};

export const fetchSectionSettings = async (id) => {
  return await fetchData(`/section-settings/${id}`);
};

