import { BASE_URL } from '@app/_utils/fetch/fetch';

export const DeletePersonalImage = async (
  setLoading,
  setError,
  onSuccess,
  toast,
  t,
) => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`${BASE_URL}/my-image`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // Set content-type to JSON
      },
    });

    if (!response.ok) {
      const contentType = response.headers.get('Content-Type');
      let errorText;

      if (contentType && contentType.includes('text/html')) {
        errorText = t('responseErrors.general.UNEXPECTED');
      } else {
        errorText = await response.text();
        errorText = t(`responseErrors.personal.${errorText}`);
      }
      toast.error(errorText);
      throw new Error(errorText);
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

