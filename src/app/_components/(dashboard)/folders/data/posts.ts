import { BASE_URL } from '@app/_components/_constants/fetch';
import { getCookie } from 'cookies-next';

export const CreateFolderMetadata = async (
  data,
  setLoading,
  setError,
  onSuccess,
  t,
  toast,
) => {
  setLoading(true);
  setError(null);
  let errorText;
  const token = getCookie('token');

  try {
    const response = await fetch(`${BASE_URL}/metadata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error('CREATE_METADATA_ERROR');
    }

    const result = await response.json();
    await onSuccess();
    return result;
  } catch (error) {
    errorText = t(`folders.errors.${error.message}`);
    toast.error(errorText);
    setError(errorText);
    throw error; // Optionally re-throw the error if you want to handle it further elsewhere
  } finally {
    setLoading(false);
  }
};

