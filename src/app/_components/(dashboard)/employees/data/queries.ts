import { fetchData } from '@app/_utils/fetch';

export const fetchEmployee = async (id) => {
  return await fetchData(
    `/employees/${id}`,
    'GET',
    {},
    {
      next: {
        tags: [`employee${id}`],
      },
    },
  );
};

export const fetchEmployees = async (page, limit) => {
  return await fetchData(`/employees?page=${page}&limit=${limit}`);
};

export const fetchRoleEmployees = async (id, page, limit) => {
  return await fetchData(`/employees?page=${page}&limit=${limit}`);
};

export const fetchAvailableEmployeesToRole = async (roleId, page, limit) => {
  return await fetchData(`/employees?page=${page}&limit=${limit}`);
};

export const fetchEmployeePermissions = async (id, page, limit) => {
  return await fetchData(
    `/employees/${id}/permissions?page=${page}&limit=${limit}`,
  );
};

export const fetchAvailableEmployeesToSection = async (id, page, limit) => {
  return await fetchData(`/employees?page=${page}&limit=${limit}`);
};

export const fetchAvailableEmployeesToFolder = async (id, page, limit) => {
  return await fetchData(`/employees?page=${page}&limit=${limit}`);
};

export const fetchAvailableEmployeesToFile = async (id, page, limit) => {
  return await fetchData(`/employees?page=${page}&limit=${limit}`);
};

