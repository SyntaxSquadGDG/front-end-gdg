import { BASE_URL } from '@app/_utils/fetch/fetch';
import { getCookie } from 'cookies-next/client';

export const sendMessage = async (
  data,
  setLoading,
  setError,
  onSuccess,
  t,
  toast,
) => {
  try {
    setLoading(true);
    setError(null);

    const token = getCookie('token');
    let errorText;
    console.log(data);
    const response = await fetch(`${BASE_URL}/messages`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json', // Add this header
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

    await onSuccess();
    const result = await response.json();
    return result;
  } catch (e) {
    setError(e.message);
  } finally {
    setLoading(false);
  }
};

