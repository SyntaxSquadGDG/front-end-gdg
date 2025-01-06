import { fetchData } from '@app/_utils/fetch';

export const fetchRoles = async (page, limit) => {
  return await fetchData(`/roles?page=${page}&limit=${limit}`);
};

export const fetchMyRoles = async (page, limit) => {
  return await fetchData(`/roles?page=${page}&limit=${limit}`);
};

export const fetchEmployeeRoles = async (id, page, limit) => {
  return await fetchData(`/roles?page=${page}&limit=${limit}`);
};

export const fetchAvailableRolesToEmployee = async (
  employeeId,
  page,
  limit,
) => {
  return await fetchData(`/roles?page=${page}&limit=${limit}`);
};

export const fetchRolePermissions = async (id, page, limit) => {
  return await fetchData(
    `/roles/${id}/permissions?page=${page}&limit=${limit}`,
  );
};

export const fetchAvailableRolesToSection = async (id, page, limit) => {
  return await fetchData(`/roles?page=${page}&limit=${limit}`);
};

export const fetchAvailableRolesToFolder = async (id, page, limit) => {
  return await fetchData(`/roles?page=${page}&limit=${limit}`);
};

export const fetchAvailableRolesToFile = async (id, page, limit) => {
  return await fetchData(`/roles?page=${page}&limit=${limit}`);
};

