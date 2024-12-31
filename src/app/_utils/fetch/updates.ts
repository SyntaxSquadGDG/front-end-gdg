import { BASE_URL } from './fetch';

export const UpdateRoleFetch = async (
  id,
  data,
  setLoading,
  setError,
  onSuccess,
) => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`${BASE_URL}/roles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Set content-type to JSON
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error updating role');
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

export const UpdateEmployeeFetch = async (
  id,
  data,
  setLoading,
  setError,
  onSuccess,
) => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`${BASE_URL}/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Set content-type to JSON
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error updating employee');
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

