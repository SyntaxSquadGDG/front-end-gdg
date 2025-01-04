import { BASE_URL, SECOND_URL } from '@app/_components/_constants/fetch';
import { getCookie } from 'cookies-next';

export const fetchSections = async (currentPage, limit) => {
  const token = getCookie('token');
  const response = await fetch(
    `${SECOND_URL}/Sections/getallsections?page=${currentPage}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // credentials: 'include', // Ensures cookies are sent
    },
  );

  if (!response.ok) {
    throw new Error('Error fetching sections');
  }

  const data = await response.json();
  return data;
};

export const fetchSectionName = async (id) => {
  const token = getCookie('token');
  const response = await fetch(
    `${SECOND_URL}/Sections/SectioNameById?id=${id}`,
    {
      next: {
        tags: ['sectionName', id],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // credentials: 'include', // Ensures cookies are sent
    },
  );

  if (!response.ok) {
    throw new Error('Error fetching section name');
  }

  const data = await response.json();
  return data;
};

export const fetchSectionFolders = async (currentPage, limit, id) => {
  const token = getCookie('token');
  const response = await fetch(
    `${SECOND_URL}/Sections/FoldersByParentId?id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // credentials: 'include', // Ensures cookies are sent
    },
  );

  if (!response.ok) {
    throw new Error('Error fetching section name');
  }

  const data = await response.json();
  return data;
};

// export const fetchSectionPath = async (id) => {
//   const token = getCookie('token');
//   const response = await fetch(
//     `${SECOND_URL}/Sections/SectioNameById?id=${id}`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       // credentials: 'include', // Ensures cookies are sent
//     },
//   );

//   if (!response.ok) {
//     throw new Error('Error fetching section name');
//   }

//   const data = await response.json();
//   return data;
// };

export const fetchSectionSettings = async (id, setError, t, toast) => {
  let errorText;
  try {
    const token = getCookie('token');
    const response = await fetch(`${BASE_URL}/section-settings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // credentials: 'include', // Ensures cookies are sent
    });

    if (!response.ok) {
      throw new Error('SECTION_SETTINGS_ERROR');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    errorText = t(`files.errors.${error.message}`);
    toast.error(errorText);
    setError(errorText);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  }
};

