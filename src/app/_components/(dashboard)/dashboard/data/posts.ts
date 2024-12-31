import { BASE_URL } from '@app/_utils/fetch/fetch';
import { getCookie } from 'cookies-next/client';

export const trainModel = async (toast, t, setLoading, setError, onSuccess) => {
  try {
    setError(null);
    setLoading(true);
    let errorText;

    const token = getCookie('token');
    const response = await fetch(`${BASE_URL}/train`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include', // Ensures cookies are sent
    });
    if (!response.ok) {
      console.log(response.status);
      if (response.status === 404) {
        errorText = t('errors.fetchNotFound');
      } else {
        errorText = await response.text();
        errorText = t(`errors.${errorText}`);
      }
      toast.error(errorText);
      throw new Error(errorText);
    }

    const data = await response.json();
    console.log(data);
    onSuccess();
    return data;
  } catch (e) {
    setError(e.message);
  } finally {
    setLoading(false);
  }
};

