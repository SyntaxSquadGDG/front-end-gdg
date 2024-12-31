import { BASE_URL } from './fetch';

export const CreateEmployeeFetch = async (
  data,
  setLoading,
  setError,
  onCreateSuccess,
) => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`${BASE_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set content-type to JSON
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error creating employee');
    }

    const result = await response.json();
    await onCreateSuccess();
    return result;
  } catch (error) {
    setError(error.message);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  } finally {
    setLoading(false);
  }
};

export const CreateRoleFetch = async (
  data,
  setLoading,
  setError,
  onCreateSuccess,
) => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`${BASE_URL}/roles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set content-type to JSON
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error creating employee');
    }

    const result = await response.json();
    await onCreateSuccess();
    return result;
  } catch (error) {
    setError(error.message);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  } finally {
    setLoading(false);
  }
};

export const AddTypeToType = async (
  fromType,
  fromId,
  addingType,
  addingIds,
  setLoading,
  setError,
  onCreateSuccess,
) => {
  setLoading(true);
  setError(null);

  const from = fromType === 'employee' ? 'employees' : 'roles';
  const adding = addingType === 'employee' ? 'employees' : 'roles';

  try {
    const response = await fetch(`${BASE_URL}/${from}/${fromId}/${adding}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set content-type to JSON
      },
      body: JSON.stringify(addingIds),
    });

    if (!response.ok) {
      throw new Error('Error creating employee');
    }

    const result = await response.json();
    await onCreateSuccess();
    return result;
  } catch (error) {
    setError(error.message);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  } finally {
    setLoading(false);
  }
};

