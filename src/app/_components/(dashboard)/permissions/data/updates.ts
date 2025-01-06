import { fetchData } from '@app/_utils/fetch';

export const updateEmployeesSectionPermissions = async (sectionId, data) => {
  return await fetchData(
    `/permissions/sections/${sectionId}/employees`,
    'PUT',
    data,
  );
};

export const updateRolesSectionPermissions = async (sectionId, data) => {
  return await fetchData(
    `/permissions/sections/${sectionId}/roles`,
    'PUT',
    data,
  );
};

export const updateEmployeesFolderPermissions = async (folderId, data) => {
  return await fetchData(
    `/permissions/folders/${folderId}/employees`,
    'PUT',
    data,
  );
};

export const updateRolesFolderPermissions = async (folderId, data) => {
  return await fetchData(`/permissions/folders/${folderId}/roles`, 'PUT', data);
};

export const updateEmployeesFilePermissions = async (fileId, data) => {
  return await fetchData(`/permissions/files/${fileId}/employees`, 'PUT', data);
};

export const updateRolesFilePermissions = async (fileId, data) => {
  return await fetchData(`/permissions/files/${fileId}/roles`, 'PUT', data);
};

