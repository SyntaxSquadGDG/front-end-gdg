import { BASE_URL } from '@app/_utils/fetch/fetch';

export const CreateManager = async (
  data,
  setLoading,
  setError,
  onCreateSuccess,
) => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`${BASE_URL}/managers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set content-type to JSON
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error creating manager');
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

