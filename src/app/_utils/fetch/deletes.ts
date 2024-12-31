import { BASE_URL } from './fetch';

export const DeleteEmployeeFetch = async (
  id,
  setLoading,
  setError,
  onDeleteSuccess,
) => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`${BASE_URL}/employees/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting employee');
    }

    const result = await response.json();
    await onDeleteSuccess();
    return result;
  } catch (error) {
    setError(error.message);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  } finally {
    setLoading(false);
  }
};

export const DeleteRoleFetch = async (
  id,
  setLoading,
  setError,
  onDeleteSuccess,
) => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`${BASE_URL}/roles/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting role');
    }

    const result = await response.json();
    await onDeleteSuccess();
    return result;
  } catch (error) {
    setError(error.message);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  } finally {
    setLoading(false);
  }
};

export const DeleteItemPermission = async (
  id,
  type,
  permissionId,
  setLoading,
  setError,
  onSuccess,
) => {
  setLoading(true);
  setError(null);

  const endpoint = type === 'employee' ? 'employees' : 'roles';

  try {
    const response = await fetch(
      `${BASE_URL}/${endpoint}/${id}/${permissionId}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error(`Error deleting ${type}`);
    }

    const result = await response.json();
    await onSuccess();
    return result;
  } catch (error) {
    setError(error.message);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  } finally {
    setLoading(false);
  }
};

