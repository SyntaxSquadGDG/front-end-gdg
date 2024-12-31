import { BASE_URL } from '@app/_utils/fetch/fetch';

export const SubscribePlan = async (data, setLoading, setError, onSuccess) => {
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(`${BASE_URL}/subscribe-plan`, {
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
    await onSuccess();
    return result;
  } catch (error) {
    setError(error.message);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  } finally {
    setLoading(false);
  }
};

export const UnsubscribePlan = async (
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
    const response = await fetch(`${BASE_URL}/unsubscribe-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set content-type to JSON
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const contentType = response.headers.get('Content-Type');
      let errorText;

      if (contentType && contentType.includes('text/html')) {
        errorText = t('responseErrors.plans.UNEXPECTED');
      } else {
        errorText = await response.text();
        errorText = t(`responseErrors.plans.${errorText}`);
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

