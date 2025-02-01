import { fetchData } from '../fetch';
import { BASE_URL } from './fetch';

export const fetchRolesClient = async (currentPage, limit) => {
  const response = await fetch(
    `${BASE_URL}/roles?page=${currentPage}&limit=${limit}`,
  );
  if (!response.ok) {
    throw new Error('Error fetching roles');
  }
  return response.json();
};

export const fetchEmployees = async () => {
  const employeesReq = await fetch(`${BASE_URL}/employees`, {
    next: {
      revalidate: 0,
      tags: ['employees'],
    },
  });
  return employeesReq.json();
};

export const fetchEmployeesClient = async (currentPage, limit) => {
  const response = await fetch(
    `${BASE_URL}/employees?page=${currentPage}&limit=${limit}`,
  );
  if (!response.ok) {
    throw new Error('Error fetching roles');
  }

  const data = await response.json();
  console.log(data);
  return data;
};

export const fetchRole = async (id) => {
  const response = await fetch(`${BASE_URL}/roles/${id}`, {
    next: {
      revalidate: 0,
      tags: ['roleId', id],
    },
  });
  if (!response.ok) {
    throw new Error('Error fetching roles');
  }

  const data = await response.json();
  return data;
};

export const fetchEmployee = async (id) => {
  const response = await fetch(`${BASE_URL}/employees/${id}`, {
    next: {
      revalidate: 0,
      tags: ['employeeId', id],
    },
  });
  if (!response.ok) {
    throw new Error('Error fetching roles');
  }

  const data = await response.json();
  return data;
};

export const fetchRoleEmployees = async (currentPage, limit, roleId) => {
  // const employeesReq = await fetch(
  //   `${BASE_URL}/roles/${roleId}/employees?page=${currentPage}&limit=${limit}`,
  // );
  const response = await fetch(
    `${BASE_URL}/employees?page=${currentPage}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error('Error fetching roles');
  }

  const data = await response.json();
  console.log(data);
  return data;
};

export const fetchEmployeeRoles = async (currentPage, limit, employeeId) => {
  // const employeesReq = await fetch(
  //   `${BASE_URL}/employees/${employeeId}/roles?page=${currentPage}&limit=${limit}`,
  // );
  const response = await fetch(
    `${BASE_URL}/roles?page=${currentPage}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error('Error fetching roles');
  }

  const data = await response.json();
  console.log(data);
  return data;
};

export const fetchTypePermissions = async (currentPage, limit, type, id) => {
  const endpoint = type === 'employee' ? 'employees' : 'roles';
  const response = await fetch(
    `${BASE_URL}/${endpoint}/${id}/permissions?page=${currentPage}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error('Error fetching roles');
  }

  const data = await response.json();
  return data;
};

export const fetchTypeActivities = async (currentPage, limit, type, id) => {
  const endpoint = type === 'employee' ? 'employees' : 'roles';
  const response = await fetch(
    `${BASE_URL}/${endpoint}/${id}/activities?page=${currentPage}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error('Error fetching roles');
  }

  const data = await response.json();
  return data;
};

export const fetchAvailableStructure = async () => {
  const res = await fetchData('/structure');
  return res;
};

export const fetchStructure = async () => {
  const res = await fetchData('/structure');
  return res.folders;
};

