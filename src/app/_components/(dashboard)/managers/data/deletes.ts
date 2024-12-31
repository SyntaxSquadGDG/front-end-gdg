import { BASE_URL } from '@app/_utils/fetch/fetch';

export const DeleteManager = async (id, setLoading, setError, onSuccess) => {
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
    await onSuccess();
    return result;
  } catch (error) {
    setError(error.message);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  } finally {
    setLoading(false);
  }
};

