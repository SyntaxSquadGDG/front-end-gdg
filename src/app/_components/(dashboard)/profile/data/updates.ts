import { BASE_URL } from '@app/_utils/fetch/fetch';

export const UpdatePersonalInfo = async (
  data,
  setLoading,
  setError,
  onSuccess,
  toast,
  t,
) => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`${BASE_URL}/my-data`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Set content-type to JSON
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const contentType = response.headers.get('Content-Type');
      let errorText;
      console.log(contentType);

      // if (contentType && contentType.includes('text/plain')) {
      errorText = await response.text(); // Read the plain text response
      errorText = t(`responseErrors.personal.${errorText}`);
      // } else {
      //   errorText = t('responseErrors.general.UNEXPECTED');
      // }

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

export const UpdatePersonalPassword = async (
  data,
  setLoading,
  setError,
  onSuccess,
  toast,
  t,
) => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`${BASE_URL}/my-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Set content-type to JSON
      },
      body: JSON.stringify(data),
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

export const UpdatePersonalImage = async (
  data,
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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Set content-type to JSON
      },
      body: data,
    });

    if (!response.ok) {
      const contentType = response.headers.get('Content-Type');
      let errorText;

      if (contentType && contentType.includes('text/plain')) {
        errorText = await response.text(); // Read the plain text response
      } else {
        errorText = t('responseErrors.general.UNEXPECTED');
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

