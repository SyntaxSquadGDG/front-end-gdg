import { fetchData, fetchData2 } from '@app/_utils/fetch';

export const fetchSections = async (page, limit) => {
  return await fetchData2(
    `/Sections/getallsections?page=${page}&limit=${limit}`,
  );
};

export const fetchSectionName = async (id) => {
  return await fetchData2(`/Sections/SectioNameById?id=${id}`);
};

export const fetchSectionFolders = async (id, page, limit) => {
  return await fetchData2(`/Secations/FoldersByParentId?id=${id}`);
};

export const fetchSectionSettings = async (id) => {
  return await fetchData(`/section-settings/${id}`);
};

