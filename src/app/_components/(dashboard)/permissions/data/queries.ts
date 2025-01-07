import { fetchData } from '@app/_utils/fetch';

export const fetchEmployeeSectionPermissions = async (
  employeeId,
  sectionId,
) => {
  return await fetchData(`/section`);
};

export const fetchEmployeeFolderPermissions = async (employeeId, folderId) => {
  return await fetchData(`/employees/${employeeId}/${folderId}/permissions`);
};

export const fetchEmployeeFilePermissions = async (employeeId, fileId) => {
  return await fetchData(`/employees/${employeeId}/${fileId}/permissions`);
};

export const fetchRoleSectionPermissions = async (roleId, sectionId) => {
  return await fetchData(`/employees/${roleId}/${sectionId}/permissions`);
};

export const fetchRoleFolderPermissions = async (roleId, folderId) => {
  return await fetchData(`/roles/${roleId}/${folderId}/permissions`);
};

export const fetchRoleFilePermissions = async (roleId, fileId) => {
  return await fetchData(`/roles/${roleId}/${fileId}/permissions`);
};

