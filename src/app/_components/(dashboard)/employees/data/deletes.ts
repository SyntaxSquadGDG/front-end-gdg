import { fetchData } from '@app/_utils/fetch';

export const deleteEmployee = async (id) => {
  return await fetchData(`/employees/${id}`, 'DELETE');
};

export const deleteEmployeePermission = async (employeeId, permissionId) => {
  return await fetchData(`/employees/${employeeId}/${permissionId}`, 'DELETE');
};

