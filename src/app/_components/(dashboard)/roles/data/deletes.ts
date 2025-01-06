import { fetchData } from '@app/_utils/fetch';

export const deleteRole = async (id) => {
  return await fetchData(`/roles/${id}`, 'DELETE');
};

export const deleteRoleFromEmployee = async (roleId, employeeId) => {
  return await fetchData(`/roles/${roleId}`, 'DELETE');
};

export const deleteRolePermission = async (roleId, permissionId) => {
  return await fetchData(`/roles/${roleId}/${permissionId}`, 'DELETE');
};

